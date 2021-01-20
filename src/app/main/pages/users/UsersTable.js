import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import _ from '@lodash';
import { getUsers, openDialog } from './store';
import UsersTableHead from './UsersTableHead';
import { IconButton, MenuItem, Menu } from '@material-ui/core';

const ITEM_HEIGHT = 48;

const useStyles = makeStyles({
	avatar: {
		width: '50px',
		height: '50px',
		borderRadius: '50%',
		display: 'inline-block',
		marginRight: '10px'
	}
});

function UsersTable(props) {
	const dispatch = useDispatch();
	const styles = useStyles();
	const { users, pagination, search } = useSelector(state => {
		return state.users;
	});
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(users);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);

	const open = Boolean(anchorEl);

	const handleClick = (event, user) => {
		setSelectedUser(user);
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const getUsersRequest = useCallback(() => {
		setLoading(true);
		dispatch(getUsers({ page, perPage, search })).then(() => setLoading(false));
	}, [dispatch, page, perPage, search]);

	useEffect(() => {
		getUsersRequest();
	}, [dispatch, getUsersRequest]);

	useEffect(() => {
		setData(users);
	}, [dispatch, users]);

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setPerPage(event.target.value);
	}

	function redirectToUserPage() {
		props.history.push(`/users/${selectedUser.id}`);
		handleClose();
	}

	function deleteUser() {
		dispatch(openDialog(selectedUser));
		handleClose();
	}

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (data.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no users!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<UsersTableHead rowCount={data.length} order={order} onRequestSort={handleRequestSort} />

					<TableBody>
						{_.orderBy(data, [o => o[order.id]], [order.direction]).map(user => {
							return (
								<TableRow className="h-64 cursor-pointer" hover tabIndex={-1} key={user.id}>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{user.id}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{user.avatar && (
											<img className={styles.avatar} src={user.avatar} alt="avatar" />
										)}
										{`${user.name} ${user.last_name}`}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{user.email}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{user.company_name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{user.company_web_site}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{user.role ? user.role.readable_name : '-'}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{moment(user.created_at).local().format('DD.MM.YYYY')}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										<IconButton
											aria-label="more"
											aria-controls="long-menu"
											aria-haspopup="true"
											onClick={event => {
												handleClick(event, user);
											}}
										>
											<MoreVertIcon />
										</IconButton>
										<Menu
											id="long-menu"
											anchorEl={anchorEl}
											open={open}
											onClose={handleClose}
											PaperProps={{
												style: {
													maxHeight: ITEM_HEIGHT * 4.5,
													width: '20ch'
												}
											}}
										>
											<MenuItem onClick={() => redirectToUserPage()}>Edit</MenuItem>
											<MenuItem onClick={() => {}}>Permissions</MenuItem>
											<MenuItem onClick={() => deleteUser()}>Delete</MenuItem>
										</Menu>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="flex-shrink-0 border-t-1"
				component="div"
				count={pagination.total}
				rowsPerPage={pagination.perPage}
				page={pagination.currentPage}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
			/>
		</div>
	);
}

export default withRouter(UsersTable);
