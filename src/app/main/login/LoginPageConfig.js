import React from 'react';

const LoginPageConfig = {
	settings: {
		layout: {
			config: {
				scroll: 'content',
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				mode: 'fullwidth'
			}
		}
	},
	routes: [
		{
			path: '/auth/login',
			component: React.lazy(() => import('./LoginPage'))
		}
	]
};

export default LoginPageConfig;
