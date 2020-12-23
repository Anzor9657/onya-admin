import React from 'react';

const TradesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/trades',
			component: React.lazy(() => import('./Trades'))
		}
	]
};

export default TradesConfig;
