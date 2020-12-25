import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('users/getUsers', async ({ page, perPage, search }) => {
	const response = await axios.post('', {
		operationName: 'adminGetAllUsers',
		variables: {
			page,
			perPage,
			search
		},
		query: `
			query
				adminGetAllUsers($page: Int, $perPage: Int, $search: String) {
					adminGetAllUsers(page: $page, perPage: $perPage, filters: {search: $search}) {
						paginatorInfo { currentPage perPage total }
						data { id name last_name email avatar created_at company_name company_abn company_web_site }
					}
				}`
	});
	const {
		data: { adminGetAllUsers }
	} = await response.data;

	return adminGetAllUsers;
});

export const getUser = createAsyncThunk('users/getUser', async id => {
	const response = await axios.post('', {
		operationName: 'adminGetUser',
		variables: { id },
		query: `query adminGetUser($id: Int!) {
				adminGetUser(id: $id) {
					id
					name
					last_name
					email
					avatar
					created_at
					updated_at
					email_verified_at
					skills { id name is_recommended }
					trade { id title }
					position_id 
					educational_institution
					year_of_experience
					latitude
					longitude
					address
					work_radius
					company_name
					company_abn
					company_web_site
					profile_filled
					role { id name }
				}
			}`
	});

	const {
		data: { adminGetUser }
	} = await response.data;

	return adminGetUser;
});

export const updateUser = createAsyncThunk('users/updateUser', async form => {
	const workRadiuses = ['UP_TO_25KM', 'UP_TO_50KM', 'UP_TO_100KM', 'FROM_TO_100KM'];
	form.work_radius = workRadiuses.findIndex(item => item === form.work_radius);
	const response = await axios.post('', {
		operationName: 'adminUpdateUser',
		variables: form,
		query: `mutation adminUpdateUser(
							$id: Int!
							$name: String!
							$last_name: String!
							$email: String!
							$position_id: Int
							$educational_institution: String
							$year_of_experience: Int
							$address: String
							$work_radius: Int
							$company_name: String
							$company_abn: String
							$company_web_site: String
							$password: String
						) {
						adminUpdateUser(
							input: {
								id: $id
								name: $name
								last_name: $last_name
								email: $email
								position_id: $position_id
								educational_institution: $educational_institution
								year_of_experience: $year_of_experience
								address: $address
								work_radius: $work_radius
								company_name: $company_name
								company_abn: $company_abn
								company_web_site: $company_web_site
								password: $password
							}
						) {
						id
						name
						last_name
						email
						avatar
						created_at
						updated_at
						email_verified_at
						skills { id name is_recommended }
						trade { id title }
						position_id 
						educational_institution
						year_of_experience
						latitude
						longitude
						address
						work_radius
						company_name
						company_abn
						company_web_site
						profile_filled
						role { id name }
					}
				}`
	});

	getUser(form.id);

	const {
		data: { adminUpdateUser }
	} = await response.data;

	return adminUpdateUser;
});

const initialState = {
	users: [],
	user: null,
	pagination: null
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setSearchText: (state, action) => {
			state.search = action.payload;
		}
	},
	extraReducers: {
		[getUsers.fulfilled]: (state, action) => {
			state.users = action.payload.data;
			state.pagination = action.payload.paginatorInfo;
		},
		[getUser.fulfilled]: (state, action) => {
			state.user = action.payload;
		},
		[updateUser.fulfilled]: (state, action) => {
			state.user = action.payload;
		}
	}
});

export const { setSearchText } = usersSlice.actions;

export default usersSlice.reducer;
