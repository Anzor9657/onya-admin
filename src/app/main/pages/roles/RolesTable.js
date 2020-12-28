import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import { getRoles } from './store';
import UsersTableHead from './RolesTableHead';

function RolesTable(props) {
	const dispatch = useDispatch();
	const { roles } = useSelector(state => state.roles);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(roles);

	const getRolesRequest = useCallback(() => {
		setLoading(true);
		dispatch(getRoles()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		getRolesRequest();
	}, [dispatch, getRolesRequest]);

	useEffect(() => {
		setData(roles);
	}, [dispatch, roles]);

	if (loading) {
		return <FuseLoading />;
	}

	if (data.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no roles!
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
						{data.map(role => {
							return (
								<TableRow className="h-64 cursor-pointer" hover tabIndex={-1} key={role.id}>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{role.id}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{role.readable_name}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{role.description}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>
		</div>
	);
}

export default withRouter(RolesTable);
