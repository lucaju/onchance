import React, { useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';

import { useApp } from '../../app';
import ConversationTurn from './ConversationTurn';
import BalloonNarrator from './balloons/BalloonNarrator';
import { initialSpeech } from './narrator';

const useStyles = makeStyles((theme) => ({
	root: (userInputHeight) => ({
		padding: theme.spacing(1),
		height: `calc(100vh - ${userInputHeight}px)`,
		overflowY: 'auto',
	}),
	conversationTurn: {
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
		actions.conversation.addNarratorInput(initialSpeech);
		const timer = setTimeout(() => actions.conversation.addBotInput('hello'), 1000);
		return () => clearTimeout(timer);
	}, []);

	//update conversation
	useLayoutEffect(() => {
		//scroll
		conversationNode.scrollTop = conversationNode.scrollHeight;
	}, [state.conversation.log]);

	return (
		<div className={classes.root} ref={(node) => (conversationNode = node)}>
			<Grid container direction="column" justify="flex-end" alignItems="stretch">
				{state.conversation.log.map(({ id, from, messages }) => {
					//narrator
					const baloon =
						from === 'narrator' ? (
							<BalloonNarrator
								key={id}
								className={classes.balloon}
								id={id}
								messages={messages}
							/>
						) : (
							//bot or user
							<ConversationTurn
								key={id}
								side={from === 'user' ? 'right' : 'left'}
								className={classes.conversationTurn}
								GridContainerProps={
									from === 'bot' ? { classes: { root: classes.conversationTurn } } : {}
								}
								id={id}
								messages={messages}
							/>
						);

					return baloon;
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
