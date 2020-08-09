/* eslint-disable no-use-before-define */
import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';
import { getVideo } from '../videos/videos.mjs';

const projectId = 'loto-documentary';
const sessionId = uuidv4();
let contexts = [];
let queryParams = {};

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} text text to send to dialogflow
 */
export const sendDialog = async (text) => {
	queryParams = { contexts }; // get contexts

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
				text,
				languageCode: 'en-US',
			},
		},
		queryParams,
	};

	// send request
	const responses = await sessionClient.detectIntent(request);
	const queryResult = responses[0].queryResult;

	// save context
	contexts = queryResult.outputContexts;

	// proCcess queryResult
	const botResponse = await processQueryResults(queryResult);
	if (reset) botResponse.reset = true; // reset context

	return botResponse;
};

const resetContexts = () => {
	queryParams = {
		resetContexts: true,
		contexts: [],
	};
};

const processQueryResults = async (queryResult) => {
	const responses = await Promise.all(
		queryResult.fulfillmentMessages.map((response) => proccessEachResponse(response))
	);
	return {
		responses,
		raw: queryResult,
	};
};

const proccessEachResponse = async (response) => {
	if (response.message === 'text') {
		return Promise.resolve({
			type: 'text',
			text: response.text.text.join(''),
		});
	}

	if (response.message === 'payload') {
		const payload = await processPayload(response.payload.fields);
		return Promise.resolve(payload);
	}
};

const processPayload = async (payload) => {
	if (payload.type?.stringValue?.toLowerCase() === 'video') {
		return {
			type: 'video',
			data: await getVideoData(payload),
		};
	}
	return null;
};

const getVideoData = async ({ select, source, tags }) => {
	select = select.stringValue;

	const request = { select };
	if (select === 'source') request.source = source?.stringValue?.toLowerCase();
	if (select === 'tags') {
		const tagsArray = tags?.listValue?.values;
		request.tags = tagsArray.map(({ stringValue }) => stringValue);
	}
	return await getVideo(request);
};
