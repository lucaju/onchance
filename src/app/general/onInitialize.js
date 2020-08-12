export const onInitialize = async ({ state, effects }) => {
	state.general.settings = await effects.general.settings.getSettings();
};
