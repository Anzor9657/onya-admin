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
import { makeStyles } from '@material-ui/core/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import { getUsers } from './store';
import UsersTableHead from './UsersTableHead';

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

	function redirectToUserPage(id) {
		props.history.push(`/users/${id}`);
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
					<UsersTableHead rowCount={data.length} />

					<TableBody>
						{data.map(user => {
							return (
								<TableRow
									className="h-64 cursor-pointer"
									hover
									tabIndex={-1}
									key={user.id}
									onClick={() => redirectToUserPage(user.id)}
								>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{user.id}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{user.avatar && (
											<img className={styles.avatar} src={user.avatar} alt="avatar" />
										)}
										{user.name}
										{user.last_name}
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
										{moment(user.created_at).local().format('DD.MM.YYYY')}
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
