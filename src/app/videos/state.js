/* eslint-disable no-shadow */
import { derived } from 'overmind';

export const state = {
	log: [],
	last: derived((state) => {
		return state.log[state.log.length - 1];
	}),
};
