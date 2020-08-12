export const settings = {
	getSettings: async () => {
		const response = await fetch('/general/settings');
		return await response.json();
	},
};
