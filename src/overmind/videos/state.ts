/* eslint-disable no-shadow */
import { derived } from 'overmind';
import { IVideo } from '../../types';

type State = {
  log: IVideo[];
  last: IVideo;
};

export const state: State = {
  log: [],
  last: derived((state: State) => {
    return state.log[state.log.length - 1];
  }),
};
