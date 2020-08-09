/* eslint-disable no-shadow */
import { derived } from 'overmind';

export const state = {
	log: [],
	lastUserInput: derived((state) => {
		const log = [...state.log];
		return log.reverse().find(({ from }) => from === 'user');
	}),
	lastBotInput: derived((state) => {
		const log = [...state.log];
		return log.reverse().find(({ from }) => from === 'bot');
	}),
};
