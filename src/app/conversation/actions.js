/* eslint-disable no-use-before-define */
import { v4 as uuidv4 } from 'uuid';

export const addUserInput = ({ state }, input) => {
	const dialogue = {
		id: uuidv4(),
		from: 'user',
		responses: [{ type: 'text', text: input }],
	};
	state.conversation.log = [...state.conversation.log, dialogue];
};

export const addBotInput = async ({ state, actions, effects }, input) => {
	const data = await effects.conversation.dialogFlow.sendUserInput(input);

	if (data.reset) resetConversation(state);

	const responses = processMessagesTiming(data.responses);

	const dialogue = {
		from: 'bot',
		id: uuidv4(),
		responses,
		data: data.raw,
	};

	state.conversation.log = [...state.conversation.log, dialogue];

	// Check if there is other types of message
	responses.map((response) => {
		if (response.type === 'video') {
			response.data.delay = response.delay;
			actions.videos.add(response.data);
			actions.conversation.addNarratorInput({
				text: speechfyVideoMetadata(response.data),
				delay: response.delay,
			});
		}
	});
};

export const addNarratorInput = ({ state }, input) => {
	const dialogue = {
		id: uuidv4(),
		from: 'narrator',
		responses: [input],
	};
	state.conversation.log = [...state.conversation.log, dialogue];
};

export const getInputById = ({ state }, id) => {
	const input = state.conversation.log.find((dialog) => dialog.id === id);
	if (!input) return '';
	return JSON.stringify(input.data, null, 4);
};

const resetConversation = ({ conversation, videos }) => {
	// conversation
	const initialInteraction = conversation.log[0];
	conversation.log = [initialInteraction];

	// vdeoplayer
	videos.log = [];
};

const speechfyVideoMetadata = (video) => {
	const msg = [`Title: ${video.title}`];
	if (video.author) msg.push(`Author: ${video.author}`);
	if (video.year) msg.push(`Year: ${video.year}`);
	if (video.Genre) msg.push(`Genre: ${video.Genre}`);
	return msg.join('\n');
};

// Bot typing time
const processMessagesTiming = (responses) => {
	// Average human typying speed: 1 word/600ms;
	// Average characters per word: 5;
	// Average typing speed 1 character/120ms
	const INITIAL_DELAY = Math.random(0.2, 0.7) * (1000 / 2);
	const TIME_PER_CHARACRTER = Math.random(0.9, 1.2) * (100 / 2);

	let delay = Math.floor(INITIAL_DELAY);

	responses = responses.map((response) => {
		if (response.type === 'text') {
			const typingTime = Math.floor(
				delay + INITIAL_DELAY + response.text.length * TIME_PER_CHARACRTER
			);
			response.typingTime = typingTime;
			response.delay = delay;

			delay += Math.floor(INITIAL_DELAY + typingTime);

			return response;
		}

		if (response.type === 'video') {
			const durationParts = response.data.duration.split(':').reverse();
			const seconds = durationParts[0] * 1000; // in ms
			const minutes = durationParts[1] * 60 * 1000; // in ms
			const duration = minutes + seconds;

			response.delay = Math.floor(delay);
			delay += Math.floor(INITIAL_DELAY + duration);

			return response;
		}
	});

	return responses;
};
