const sendDialog = async msg => {

	const body = {msg};

	try {

		const response = await fetch('/dialogflow',{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});

		const json = await response.json();
		return json;

	} catch (err) {
		console.log(err);
		return err;
	}

};

const getSimplifiedLastDialog = data => {

	let msgConcat = '';
	for (const item of data.messages) {
		msgConcat += item.content;
	}

	const body = {
		user: {
			text: data.queryText
		},
		bot: {
			text: msgConcat,
			intent: data.intent.displayName,
			subjects: data.subjects
		}
	};

	return body;

};

const getDebug = data => {
	return data;
};

const getLog = (agent,data) => {

	return {
		agent: agent,
		type: 'DialogFlow',
		language: data.languageCode,
		conversation: data.fulfillmentMessages,
		messages: data.messages,
		data: data
	};

};

export default {
	sendDialog,
	getSimplifiedLastDialog,
	getDebug,
	getLog,
};