export const changeVidew = ({ state }, view) => {
	state.general.view = view;
};

export const setDebug = ({ state }, value) => {
	state.general.debug = value;
};

export const setDebugDialog = ({ state }, value) => {
	state.general.debugDialog = value;
};

export const reset = ({ state }) => {
	state.conversation.log = [];
	state.videos.log = [];
};
