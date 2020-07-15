export const dialogFlow = {
	sendUserInput: async (msg) => {
		const input = { msg };
		const response = await fetch('/dialogflow', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(input),
		});

		return await response.json();
	},
};
