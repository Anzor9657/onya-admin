import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { openDialog } from './store';

function TradesHeader(props) {
	const dispatch = useDispatch();

	function openNewDialog() {
		dispatch(openDialog({ type: 'new', trade: null }));
	}

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">local_offer</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						Trades
					</Typography>
				</FuseAnimate>
			</div>
			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					className="whitespace-nowrap normal-case"
					variant="contained"
					color="secondary"
					onClick={openNewDialog}
				>
					Add trade
				</Button>
			</FuseAnimate>
		</div>
	);
}

export default TradesHeader;
