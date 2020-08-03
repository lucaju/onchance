import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Grid, makeStyles, TextField } from '@material-ui/core';

import { useApp } from '../../app';
import Conversation from '../conversation/Conversation';

let userInputHeight = 64;

const useStyles = makeStyles((theme) => ({
	drawerPaper: (sidebarWidth) => ({ width: sidebarWidth }),
	textInput: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		background: theme.palette.grey[700]
	},
	grid: { height: '100vh' },
}));

const SideBar = ({ sidebarWidth }) => {
	const classes = useStyles(sidebarWidth);
	const [userInputState, setUserInputState] = React.useState('');
	const { actions } = useApp();

	// let TextFieldNode;

	const handleUserInput = ({ target }) => {
		setUserInputState(target.value);
	};

	const handleUserTriggerInput = (event) => {
		event.preventDefault;
		if (event.key === 'Enter') {
			actions.conversation.addUserInput(userInputState);
			actions.conversation.addBotInput(userInputState);
			setUserInputState('');
		}
	};

	// useLayoutEffect(() => {
	// 	userInputHeight = TextFieldNode.scrollHeight;
	// 	console.log(userInputHeight);
	// },[]);

	return (
		<Drawer anchor="right" variant="permanent" classes={{ paper: classes.drawerPaper }}>
			<Grid
				container
				alignItems="stretch"
				direction="column"
				justify="space-between"
				className={classes.grid}
			>
				<Conversation userInputHeight={userInputHeight} />
				<TextField
					// ref={(node) => (TextFieldNode = node)}
					placeholder="Type here"
					value={userInputState}
					id="user-input"
					className={classes.textInput}
					onChange={handleUserInput}
					onKeyPress={handleUserTriggerInput}
					// multiline
				/>
			</Grid>
		</Drawer>
	);
};

SideBar.propTypes = {
	sidebarWidth: PropTypes.number,
};

export default SideBar;
