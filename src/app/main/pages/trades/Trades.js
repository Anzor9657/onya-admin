import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store';
import TradesHeader from './TradesHeader';
import TradesTable from './TradesTable';

function Trades() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<TradesHeader />}
			content={<TradesTable />}
			innerScroll
		/>
	);
}

export default withReducer('trades', reducer)(Trades);
