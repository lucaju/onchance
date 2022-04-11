import { Context } from '../';

//* INIITIALIZE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const onInitializeOvermind = async ({ state, effects }: Context, overmind: any) => {
  state.general.settings = await effects.general.settings.getSettings();
};

export const changeView = ({ state }: Context, view: string) => {
	state.general.view = view;
};

export const setDebug = ({ state }: Context, value: boolean) => {
	state.general.debug = value;
};

export const setDebugDialog = ({ state }: Context, value?: string) => {
	state.general.debugDialog = value;
};

export const reset = ({ state }: Context) => {
	state.conversation.log = [];
	state.videos.log = [];
};
