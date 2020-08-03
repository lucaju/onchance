import { v4 as uuidv4 } from 'uuid';

export const addUserInput = ({ state }, input) => {
	const dialogue = {
		id: uuidv4(),
		from: 'user',
		messages: [input],
	};
	state.conversation.log = [...state.conversation.log, dialogue];
};

export const addBotInput = async ({ state, actions, effects }, input) => {
	const data = await effects.conversation.dialogFlow.sendUserInput(input);

	if (data.reset) resetConversartion(state);

	const dialogue = {
		from: 'bot',
		id: uuidv4(),
		messages: data.messages,
		data,
	};

	state.conversation.log = [...state.conversation.log, dialogue];

	//if actions
	if (data.actions) {
		// filter for video action
		const videoTriggers = data.actions.filter(({ play }) => play === 'video');
		if (!videoTriggers) return;
		//add video to collection
		videoTriggers.map(({ video }) => {
			actions.videos.add(video);
			actions.conversation.addNarratorInput(speechfyVideoMetadata(video));
		});
	}
};

const resetConversartion = ({conversation, videos}) => {
	//conversation
	const initialInteraction = conversation.log[0];
	conversation.log = [initialInteraction];

	//vdeoplayer
	videos.log = [];
};

const speechfyVideoMetadata = (video) => {
	console.log(video);
	const msg = [
        `Title: ${video.title}\n`,
        `Author: ${video.author}\n`,
        `Year: ${video.year}\n`,
        `Genre: ${video.genre}`
	].join('\n');
	return msg;
};

export const addNarratorInput = ({ state }, input) => {
	const dialogue = {
		id: uuidv4(),
		from: 'narrator',
		messages: [input],
	};
	state.conversation.log = [...state.conversation.log, dialogue];
};

export const getInputById = ({ state }, id) => {
	const input = state.conversation.log.find((dialog) => dialog.id === id);
	if (!input) return '';
	return JSON.stringify(input.data, null, 4);
};
