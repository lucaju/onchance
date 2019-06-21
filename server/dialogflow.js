const dialogflow = require('dialogflow');
const uuidv4 = require('uuid/v4');

const projectId = 'loto-documentary';

let contexts = [];

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
const sendDialog = async (msg) => {

	// A unique identifier for the given session
	const sessionId = uuidv4();

	// // Create a new session
	const sessionClient = new dialogflow.SessionsClient({
		keyFilename: './credentials/google-dialogflow-Loto-Documentary-5ebc6370765e.json',
	});
	const sessionPath = sessionClient.sessionPath(projectId, sessionId);

	// The text query request.
	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				// The query to send to the dialogflow agent
				text: msg,
				// The language used by the client (en-US)
				languageCode: 'en-US',
			},
		},
		queryParams: {
			contexts: contexts
		}
	};

	// Send request and log result
	const responses = await sessionClient.detectIntent(request);
	const result = responses[0].queryResult;
	// console.log(result);

	//mensages 
	const messages = [];
	for (const message of result.fulfillmentMessages) {
		const msg = {
			type: message.message,
			content: message.text.text[0] // this might be change. It may be more than one message here.
		};
		messages.push(msg);
	}

	const dialogResult = {
		action: result.action,
		fulfillmentMessages: result.fulfillmentMessages,
		fulfillmentText: result.fulfillmentText,
		intent: result.intent,
		intentDetectionConfidence: result.intentDetectionConfidence,
		languageCode: result.languageCode,
		messages: messages,
		outputContexts: result.outputContexts,
		queryText: result.queryText,
		speechRecognitionConfidence: result.speechRecognitionConfidence,
	};

	//save context
	contexts = result.outputContexts;
	dialogResult.subjects = [];

	if (contexts.length > 0) {
		dialogResult.subject = [];
		// console.log(context)
		for (const context of contexts) {
			if (context.parameters) {
				dialogResult.subjects.push(context.parameters.fields.subject.stringValue);
			}
		}
	}

	// console.log(dialogResult.subjects);
	
	return dialogResult;

};

exports.sendDialog = sendDialog;