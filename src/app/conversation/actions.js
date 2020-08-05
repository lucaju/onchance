import { v4 as uuidv4 } from 'uuid';

export const addUserInput = ({ state }, input) => {
	const dialogue = {
		id: uuidv4(),
		from: 'user',
		messages: [{ text: input }],
	};
	state.conversation.log = [...state.conversation.log, dialogue];
};

export const addBotInput = async ({ state, actions, effects }, input) => {
	const data = await effects.conversation.dialogFlow.sendUserInput(input);

	if (data.reset) resetConversation(state);

	const messages = processMessagesTiming(data.messages);

	const dialogue = {
		from: 'bot',
		id: uuidv4(),
		messages,
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
			actions.conversation.addNarratorInput({
				text: speechfyVideoMetadata(video),
				delay: 0,
			});
		});
	}
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

const resetConversation = ({ conversation, videos }) => {
	//conversation
	const initialInteraction = conversation.log[0];
	conversation.log = [initialInteraction];

	//vdeoplayer
	videos.log = [];
};

const speechfyVideoMetadata = (video) => {
	const msg = [`Title: ${video.title}`];
	if (video.author) msg.push(`Author: ${video.author}`);
	if (video.year) msg.push(`Year: ${video.year}`);
	if (video.Genre) msg.push(`Genre: ${video.Genre}`);
	return msg.join('\n');
};

//bit typing time
const processMessagesTiming = (messages) => {
	let delay = 0;
	const INITIAL_TIME_TYPING = Math.random(0.2, 1) * 1000; //random between 300ms and 1 s
	const TIME_PER_CHARACRTER = Math.random(0.8, 1.6) * 100; //random between 300ms and 1 s

	messages = messages.map((text) => {
		const typingTime = delay + INITIAL_TIME_TYPING + text.length * TIME_PER_CHARACRTER; // number of characters * 20 ms
		const message = {
			text,
			typingTime,
			delay,
		};
		delay = +typingTime;
		return message;
	});

	return messages;
};
