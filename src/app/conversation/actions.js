import { v4 as uuidv4 } from 'uuid';

export const addUserInput = ({ state }, input) => {
	const dialogue = {
		id: state.conversation.log.length,
		from: 'user',
		messages: [input],
	};
	state.conversation.log = [...state.conversation.log, dialogue];
};

export const addBotInput = async ({ state, effects }, input) => {
	const data = await effects.conversation.dialogFlow.sendUserInput(input);

	const id = uuidv4();

	const dialogue = {
		from: 'bot',
		id,
		messages: data.messages,
		data,
	};
	state.conversation.log = [...state.conversation.log, dialogue];
};

export const getInputById = ({ state }, id) => {
	const input = state.conversation.log.find((dialog) => dialog.id === id);
	if (!input) return '';
	return JSON.stringify(input.data, null, 4);
};
