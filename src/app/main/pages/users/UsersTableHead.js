import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
		sort: false
	},
	{
		id: 'email',
		align: 'left',
		disablePadding: false,
		label: 'Email',
		sort: false
	},
	{
		id: 'company',
		align: 'left',
		disablePadding: false,
		label: 'Company',
		sort: false
	},
	{
		id: 'companyWebSite',
		align: 'left',
		disablePadding: false,
		label: 'Company web site',
		sort: false
	},
	{
		id: 'regDate',
		align: 'left',
		disablePadding: false,
		label: 'Register date',
		sort: false
	}
];

function UsersTableHead(props) {
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
						>
							{row.label}
						</TableCell>
					);
				})}
			</TableRow>
		</TableHead>
	);
}

export default UsersTableHead;
