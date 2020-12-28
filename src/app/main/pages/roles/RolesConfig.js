import React from 'react';

const RolesConfig = {
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
			path: '/roles',
			component: React.lazy(() => import('./Roles'))
		}
	]
};

export default RolesConfig;
