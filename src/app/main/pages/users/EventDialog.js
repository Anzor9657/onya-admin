import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, removeUser, getUsers } from './store';

function EventDialog(props) {
	const dispatch = useDispatch();
	const { modal, pagination, search } = useSelector(state => state.users);
	function closeComposeDialog() {
		return dispatch(closeDialog());
	}

	const getUsersRequest = useCallback(() => {
		dispatch(getUsers({ page: pagination?.currentPage, perPage: pagination?.currentPage, search }));
	}, [dispatch, pagination, search]);

	function handleRemove() {
		dispatch(removeUser(modal.user));
		getUsersRequest();
		closeComposeDialog();
	}

	return (
		<Dialog
			open={modal.isOpen}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
			component="form"
			classes={{
				paper: 'rounded-8'
			}}
		>
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Confirm deletion
					</Typography>
				</Toolbar>
			</AppBar>

			<form noValidate onSubmit={handleRemove}>
				<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
					Are you sure you want to delete {modal.user && `${modal.user?.name} ${modal.user?.last_name}`}
				</DialogContent>
				<DialogActions className="justify-between px-8 sm:px-16">
					<Button variant="contained" color="primary" type="submit">
						Delete
					</Button>
					<Button variant="contained" color="primary" type="submit" onClick={closeComposeDialog}>
						Cancel
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default EventDialog;
