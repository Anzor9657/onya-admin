import { useForm } from '@fuse/hooks';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, addTrade, editTrade, removeTrade } from './store';

const defaultFormState = {
	title: ''
};

function EventDialog(props) {
	const dispatch = useDispatch();
	const { modal } = useSelector(state => state.trades);
	const { form, handleChange, setForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (modal.type === 'edit' && modal.trade) {
			setForm(modal.trade);
		}

		/**
		 * Dialog type: 'new'
		 */
		if (modal.type === 'new') {
			setForm({
				...defaultFormState
			});
		}
	}, [modal.type, modal.trade, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (modal.isOpen) {
			initDialog();
		}
	}, [modal.isOpen, initDialog]);

	function closeComposeDialog() {
		return dispatch(closeDialog());
	}

	function canBeSubmitted() {
		return form.title.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
		switch (modal.type) {
			case 'new':
				dispatch(addTrade(form));
				break;
			case 'edit':
				dispatch(editTrade(form));
				break;
			default:
				break;
		}
		closeComposeDialog();
	}

	function handleRemove(event) {
		dispatch(removeTrade(form));
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
						{modal.type === 'new' ? 'New Trade' : 'Edit Trade'}
					</Typography>
				</Toolbar>
			</AppBar>

			<form noValidate onSubmit={handleSubmit}>
				<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
					<TextField
						id="title"
						label="Title"
						className="mt-8 mb-16"
						InputLabelProps={{
							shrink: true
						}}
						name="title"
						value={form.title}
						onChange={handleChange}
						variant="outlined"
						autoFocus
						required
						fullWidth
					/>
				</DialogContent>

				{modal.type === 'new' ? (
					<DialogActions className="justify-between px-8 sm:px-16">
						<Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted()}>
							Add
						</Button>
					</DialogActions>
				) : (
					<DialogActions className="justify-between px-8 sm:px-16">
						<Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted()}>
							Save
						</Button>
						<IconButton onClick={handleRemove}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default EventDialog;
