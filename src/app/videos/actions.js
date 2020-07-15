export const add = ({ state }, video) => {
	state.videos.log = [...state.videos.log, video];
};
