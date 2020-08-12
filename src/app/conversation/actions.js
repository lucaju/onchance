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

	const responses = processMessagesTiming(data.responses, state.general);

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
				type: 'text',
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
	if (video.genre) msg.push(`Genre: ${video.genre}`);
	return msg.join('\n');
};

// Bot typing time
const processMessagesTiming = (responses, state) => {
	const {debug, settings: { bot }} = state;

	// Average human typying speed: 1 word/600ms;
	// Average characters per word: 5;
	// Average typing speed 1 character/120ms
	let initialDelay = [200, 700]; // default: 200 - 700ms before start
	let typingDelay = [90, 120]; // default: 90-120ms per character

	if (bot) {
		initialDelay = [bot.initialDelay.min, bot.initialDelay.max];
		typingDelay = [bot.typingTimePerCharacter.min, bot.typingTimePerCharacter.max];
	}

	const INITIAL_DELAY = getRandomIntInclusive(initialDelay);
	const TIME_PER_CHARACRTER = getRandomIntInclusive(typingDelay);

	let delay = INITIAL_DELAY;
	let duration = 0;

	responses = responses.map((response) => {
		if (response.type === 'text') {
			duration = response.text.length * TIME_PER_CHARACRTER;
			
			response.typingTime = debug ? 0 : delay + duration;
			response.delay = debug ? 0 : delay;
		}

		if (response.type === 'video') {
			const durationParts = response.data.duration.split(':').reverse();
			const seconds = durationParts[0] * 1000; // in ms
			const minutes = durationParts[1] * 60 * 1000; // in ms
			
			duration = minutes + seconds;

			response.delay =  debug ? 0 : delay;
		}
		
		delay += debug ? 0 : INITIAL_DELAY + duration;

		return response;
	});

	return responses;
};

const getRandomIntInclusive = ([min, max]) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
};
