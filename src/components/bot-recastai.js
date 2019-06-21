import recastConfig from './../../credentials/recast.ai.credentials.json';

//-----

let conversationID = null;

//Send and get data to/from Recast
export const sendDialog = (msg) => {

	//prepare data to send
	if (conversationID == null) conversationID = getRandomInt(999999);

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	const dialog = {
		message: {
			type: 'text',
			content: msg
		},
		language: 'en',
		conversation_id: conversationID
	};

	const headers = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		// 'Authorization': 'Token cec759081523e1b5de6efe181a58a5d6'
	};

	headers['Authorization'] = recastConfig.credentials.developer.Authorization;


	return new Promise((resolve, reject) => {
		fetch(recastConfig.endPoints.DIALOG, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(dialog),
		}).then(res => {
			return res.json();
		}).then(data => {
			// console.log(data);
			resolve(data);
		}).catch((err) => {
			console.log(err);
			reject(err);
		});
	});

};

export const getSimplifiedLastDialog = (data) => {

	let msgConcat = '';
	for (const item of data.results.messages) {
		msgConcat += item.content;
	}

	const body = {
		user: {
			text: data.results.nlp.source
		},
		bot: {
			text: msgConcat,
			intent: data.results.nlp.intents[0].slug,
			subjects: data.subjects
		}
	};

	return body;

};

export const getDebug = (data) => {

	//get information
	const nlp = data.results.nlp;

	// console.log(nlp);

	nlp.entitiesArray = [];

	for (const entityCat in nlp.entities) {
		for (const entity of nlp.entities[entityCat]) {
			entity.name = entityCat;
			nlp.entitiesArray.push(entity);
		}
	}

	return nlp;

};

export const getLog = (agent, data) => {

	return {
		agent: agent,
		type: 'reacast',
		language: data.results.conversation.language,
		conversation: data.results.conversation,
		messages: data.results.messages,
		nlp: data.results.nlp,
	};

};

export default {
	sendDialog,
	getSimplifiedLastDialog,
	getDebug,
	getLog
};