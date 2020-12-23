import React from 'react';

const TradesConfig = {
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
			path: '/trades',
			component: React.lazy(() => import('./Trades'))
		}
	]
};

export default TradesConfig;
