import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Link, makeStyles, Typography } from '@material-ui/core';

import { useApp } from '../../../app';

const useStyles = makeStyles((theme) => ({
	topBar: (sidebarWidth) => ({ paddingRight: sidebarWidth }),
	title: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
}));

const Topbar = ({ sidebarWidth }) => {
	const classes = useStyles(sidebarWidth);
	const { actions } = useApp();

	const handleTitle = (e) => {
		e.preventDefault();
		actions.general.reset();
	};

	return (
		<AppBar elevation={0} color="transparent" className={classes.topBar}>
			<Typography
				component="h1"
				variant="h4"
				align="center"
				className={classes.title}
				onClick={handleTitle}
			>
				<Link color="inherit" underline="none" component={RouterLink} to="/">
					On Chance
				</Link>
			</Typography>
		</AppBar>
	);
};

Topbar.propTypes = {
	sidebarWidth: PropTypes.number,
};

export default Topbar;
