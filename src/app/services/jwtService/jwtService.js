import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/api/auth/register', data).then(response => {
				if (response.data.user) {
					this.setSession(response.data.access_token);
					resolve({
						...response.data.user,
						role: ['admin']
					});
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithEmailAndPassword = ({ email, password }) => {
		return new Promise((resolve, reject) => {
			axios
				.post('', {
					operationName: 'login',
					query: `
					mutation login($username: String!, $password: String!)
					{
						login(input: {username: $username, password: $password, administrator: true})
						{
							access_token refresh_token
							user {
								id name last_name email avatar created_at updated_at email_verified_at
								skills { id	name is_recommended }
								trade { id title }
								position_id educational_institution year_of_experience latitude longitude
								address work_radius company_name company_abn company_web_site profile_filled
								role { id name }
							}
						}
					}`,
					variables: {
						username: email,
						password
					}
				})
				.then(({ data: response }) => {
					if (response.data && response.data.login) {
						this.setSession(response.data.login.access_token);
						resolve({
							...response.data.login.user,
							role: ['admin']
						});
					} else {
						reject(response.data.error);
					}
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.post('', {
					operationName: 'me',
					variables: {},
					query:
						'query me { me { id name last_name email avatar created_at updated_at email_verified_at skills { id name is_recommended } trade { id title } position_id educational_institution year_of_experience latitude longitude address work_radius company_name company_abn company_web_site profile_filled }}'
				})
				.then(({ data: response }) => {
					const access_token = this.getAccessToken();
					if (response.data.me && access_token) {
						this.setSession(access_token);
						resolve({
							...response.data.me,
							role: ['admin']
						});
					} else {
						this.logout();
						reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Failed to login with token.'));
				});
		});
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const instance = new JwtService();

export default instance;
