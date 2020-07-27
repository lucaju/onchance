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

	if (text === 'hello') {
		queryParams = {
			resetContexts: true,
			contexts: [],
		};
	}

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
	const result = responses[0].queryResult;

	//save context
	contexts = result.outputContexts;

	return processResponse(result);
};

const processResponse = (result) => {
	//mensages
	let messages = result.fulfillmentMessages.filter(({ message }) => message === 'text');
	messages = messages.map(({ text }) => text.text.join(' '));

	//payloads
	let payloads = result.fulfillmentMessages.filter(({ message }) => message === 'payload');
	payloads = payloads.map(({ payload }) => payload.fields);

	//check for actions
	const actions = checkForActions(payloads);

	const dialogResult = {
		raw: result,
		messages,
		payloads,
		actions,
	};

	return dialogResult;
};

const checkForActions = (payloads) => {
	let actions = [];

	const videoTrigger = payloads.find(
		(payload) =>
			payload.action?.stringValue?.toLowerCase() === 'play' &&
			payload.media?.stringValue?.toLowerCase() === 'video'
	);

	if (videoTrigger) actions = [...actions, addVideoAction(videoTrigger)];

	return actions;
};

const addVideoAction = ({ filename = null, keywork = null, subject = null }) => {
	let mode = '';

	if (filename) mode = 'filename';
	if (keywork) mode = 'keywork';
	if (subject) mode = 'subject';

	const video = getVideo({
		mode,
		subject: subject?.stringValue.toLowerCase(),
		keyword: keywork?.stringValue.toLowerCase(),
		filename: filename?.stringValue.toLowerCase(),
	});

	return {
		play: 'video',
		mode,
		video,
	};
};
