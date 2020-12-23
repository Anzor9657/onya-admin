import React from 'react';

const UsersConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/users/:userId',
			component: React.lazy(() => import('./Users'))
		},
		{
			path: '/users',
			component: React.lazy(() => import('./Users'))
		}
	]
};

export default UsersConfig;
