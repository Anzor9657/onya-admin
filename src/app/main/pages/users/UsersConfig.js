import React from 'react';

const UsersConfig = {
	settings: {
		layout: {
			config: {
				scroll: 'content',
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
			path: '/users/:userId',
			component: React.lazy(() => import('./User'))
		},
		{
			path: '/users',
			component: React.lazy(() => import('./Users'))
		}
	]
};

export default UsersConfig;
