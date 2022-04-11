/* eslint-disable no-shadow */
import { derived } from 'overmind';
import { IDialogue } from '../../types';

type State = {
  log: IDialogue[];
  lastUserInput?: IDialogue;
  lastBotInput?: IDialogue;
};

export const state: State = {
  log: [],
  lastUserInput: derived((state: State) => {
    const log = [...state.log];
    return log.reverse().find(({ from }) => from === 'user');
  }),
  lastBotInput: derived((state: State) => {
    const log = [...state.log];
    return log.reverse().find(({ from }) => from === 'bot');
  }),
};
