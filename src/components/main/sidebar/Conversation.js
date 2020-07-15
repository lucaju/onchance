import React, { useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';

import { useApp } from '../../../app';
import Balloon from '../../shared/Balloon';

const useStyles = makeStyles((theme) => ({
	root: (userInputHeight) => ({
		padding: theme.spacing(1),
		height: `calc(100vh - ${userInputHeight}px)`,
		overflowY: 'auto',
	}),
	balloon: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
}));

const Conversation = ({ userInputHeight }) => {
	const classes = useStyles(userInputHeight);
	const { state, actions } = useApp();

	let conversationNode;

	// bot first interaction
	useEffect(() => {
		const timer = setTimeout(() => actions.conversation.addBotInput('hello'), 1000);
		return () => clearTimeout(timer);
	}, []);

	//update conversation
	useLayoutEffect(() => {

		//scroll
		conversationNode.scrollTop = conversationNode.scrollHeight;

		//if actions
		if (state.conversation.lastBotInput?.data.actions) {
			const botActions = state.conversation.lastBotInput.data.actions;
			// filter for video action
			const videoTriggers = botActions.filter(({ play }) => play === 'video');
			if (!videoTriggers) return;
			//add video actions
			videoTriggers.map(({video}) => actions.videos.add(video));
		}

	}, [state.conversation.log]);

	//bit typing time
	const getBotTypingTime = (text) => {
		let initialDelay = Math.random(0.1, 1) * 1000; //random between 300ms and 1 s
		const charDelay = text.length * 20; // number of characters * 20 ms
		return initialDelay + charDelay;
	};

	return (
		<div className={classes.root} ref={(node) => (conversationNode = node)}>
			<Grid container direction="column" justify="flex-end" alignItems="stretch">
				{state.conversation.log.map(({ id, from, messages }) => {
					let string = '';
					messages.map((msg) => (string += msg));
					const delay = from === 'bot' ? getBotTypingTime(string) : 0;

					return (
						<Balloon
							key={id}
							side={from === 'user' ? 'right' : 'left'}
							className={classes.balloon}
							GridContainerProps={
								from === 'bot'
									? { classes: { root: classes.balloon } }
									: {}
							}
							id={id}
							messages={messages}
							delay={delay}
						/>
					);
				})}
			</Grid>
		</div>
	);
};

Conversation.propTypes = {
	userInputHeight: PropTypes.number,
	userLastMessage: PropTypes.string,
};

export default Conversation;
