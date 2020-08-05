import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';

import { useApp } from '../../app';
import ConversationTurn from './ConversationTurn';
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
	const [botJustTyped, SetBotJustTyped] = useState(false);
	const { state, actions } = useApp();

	let conversationNode;

	// bot first interaction
	useEffect(() => {
		actions.conversation.addNarratorInput({
			text: initialSpeech,
			delay: 0,
		});
		const timer = setTimeout(() => actions.conversation.addBotInput('hello'), 1000);
		return () => clearTimeout(timer);
	}, []);

	const botIsTyping = (value) => {
		console.log('heis');
		SetBotJustTyped(value);
	};

	//update conversation
	useLayoutEffect(() => {
		//scroll
		console.log('opa');
		conversationNode.scrollTop = conversationNode.scrollHeight;
	}, [state.conversation.log, botJustTyped]);

	return (
		<div className={classes.root} ref={(node) => (conversationNode = node)}>
			<Grid container direction="column" justify="flex-end" alignItems="stretch">
				{state.conversation.log.map(({ id, from, messages }) => (
					<ConversationTurn
						key={id}
						source={from}
						className={classes.conversationTurn}
						GridContainerProps={
							from !== 'user' ? { classes: { root: classes.conversationTurn } } : {}
						}
						id={id}
						messages={messages}
						isTyping={botIsTyping}
					/>
				))}
			</Grid>
		</div>
	);
};

Conversation.propTypes = {
	userInputHeight: PropTypes.number,
	userLastMessage: PropTypes.string,
};

export default Conversation;
