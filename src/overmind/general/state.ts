import { ISettings } from '../../types';

type State = {
  debug: boolean;
  debugDialog?: string | null;
  settings?: ISettings | null;
	view?: string;
};

export const state: State = {
  debug: false,
  debugDialog: null,
  settings: null,
};
