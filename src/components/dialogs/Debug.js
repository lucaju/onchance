import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	makeStyles,
} from '@material-ui/core';

import { useApp } from '../../app';

const useStyles = makeStyles(() => ({
	content: {
		whiteSpace: 'pre-wrap',
		fontSize: '0.8rem',
	},
}));

const Debug = () => {
	const classes = useStyles();
	const { state, actions } = useApp();

	const handleClose = () => {
		actions.general.setDebugDialog(null);
	};

	return (
		<div>
			<Dialog
				open={!!state.general.debugDialog}
				onClose={handleClose}
				aria-labelledby="dialog-dialogflow-debug"
				aria-describedby="dialog-dialogflow-debug-content"
			>
				<DialogTitle id="dialog-dialogflow-debug-title">
					DialogFlow Diagnostic info
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						variant="body2"
						id="dialog-dialogflow-debug-content"
						className={classes.content}
					>
						{actions.conversation.getInputById(state.general.debugDialog)}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary" autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Debug;
