import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import { useApp } from '../../../app';

const useStyles = makeStyles((theme) => ({
	margin: { marginLeft: theme.spacing(0.5) },
	transparency: { opacity: 0.2 },
}));

const DebugButton = ({ id }) => {
	const classes = useStyles();
	const { actions } = useApp();

	const showDebugData = () => {
		actions.general.setDebugDialog(id);
	};

	return (
		<IconButton
			aria-label="debug"
			className={classes.margin}
			size="small"
			onClick={showDebugData}
		>
			<InfoIcon className={classes.transparency} fontSize="inherit" />
		</IconButton>
	);
};

DebugButton.propTypes = {
	id: PropTypes.any,
};

export default DebugButton;
