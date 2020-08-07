import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';
import { getVideo } from '../videos/videos.mjs';

const projectId = 'loto-documentary';
const sessionId = uuidv4();
let contexts = [];
let queryParams = {};

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
export const sendDialog = async (text) => {

	//reset context
	queryParams = { contexts };

	let reset = false;
	if (text.toLowerCase() === 'hello' || text.toLowerCase() === 'restart') reset = true;
	if (reset) resetContexts();

	// Create a new session
	// const sessionId = uuidv4();
	const sessionClient = new dialogflow.SessionsClient({
		keyFilename: './config/dialogflow.json',
	});
	const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				text, // The query to send to the dialogflow agent
				languageCode: 'en-US', // The language used by the client (en-US)
			},
		},
		queryParams
	};

	//send request
	const responses = await sessionClient.detectIntent(request);
	const response = responses[0].queryResult;

	//save context
	contexts = response.outputContexts;

	const results = processResponse(response);
	if (reset) results.reset = true;

	return results;
};

const resetContexts = () => {
	queryParams = {
		resetContexts: true,
		contexts: [],
	};
};

const processResponse = (result) => {
	//mensages
	const responses = result.fulfillmentMessages.map((response) => {
		if (response.message === 'text') {
			return {
				type: 'text',
				text: response.text.text.join('')
			};
		}
		if (response.message === 'payload') {
			const res = processPayload(response.payload.fields);
			if (res) return res;
		}
	});

	return {
		responses,
		raw: result,
	};
};

const processPayload = (payload) => {
	if (payload.type?.stringValue?.toLowerCase() === 'video') {
		return {
			type: 'video',
			data: getVideoData(payload)
		};
	}
	return null;
};

const getVideoData = ({ select, source , tags }) => {
	select = select.stringValue;

	const request = { select };
	if (select === 'source') request.source = source?.stringValue?.toLowerCase();
	if (select === 'tags') {
		const tagsArray = tags?.listValue?.values;
		request.tags = tagsArray.map(({stringValue}) => (stringValue));
	}
	return getVideo(request);
};
