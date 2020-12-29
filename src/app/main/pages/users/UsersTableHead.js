import { TableSortLabel } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

const rows = [
	{
		id: 'id',
		align: 'left',
		disablePadding: true,
		label: 'ID',
		sort: false
	},
	{
		id: 'name',
		align: 'left',
		disablePadding: false,
		label: 'Name',
		sort: true
	},
	{
		id: 'email',
		align: 'left',
		disablePadding: false,
		label: 'Email',
		sort: true
	},
	{
		id: 'company_name',
		align: 'left',
		disablePadding: false,
		label: 'Company',
		sort: true
	},
	{
		id: 'company_web_site',
		align: 'left',
		disablePadding: false,
		label: 'Company web site',
		sort: true
	},
	{
		id: 'role',
		align: 'left',
		disablePadding: false,
		label: 'Role',
		sort: true
	},
	{
		id: 'created_at',
		align: 'left',
		disablePadding: false,
		label: 'Register date',
		sort: true
	},
	{
		id: 'actions',
		align: 'left',
		disablePadding: false,
		label: 'Actions',
		sort: false
	}
];

function UsersTableHead(props) {
	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};
	return (
		<TableHead>
			<TableRow className="h-64">
				{rows.map(row => {
					return (
						<TableCell
							className="p-4 md:p-16"
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				})}
			</TableRow>
		</TableHead>
	);
}

export default UsersTableHead;
