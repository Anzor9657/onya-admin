import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import logo from 'assets/logo.svg';

const useStyles = makeStyles(theme => ({
	root: {
		margin: '0 auto'
	}
}));

function Logo() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<img src={logo} alt="onya" width="100" />
		</div>
	);
}

export default Logo;
