/* eslint-disable no-use-before-define */
import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';
import { getVideo, IVideoRequest } from '../videos';

const projectId = 'loto-documentary';
const sessionId = uuidv4();
let contexts: any = [];
let queryParams = {};

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} text text to send to dialogflow
 */
export const sendDialog = async (text: string) => {
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

  if (!queryResult) return;

  // save context
  contexts = queryResult.outputContexts;

  // proCcess queryResult
  let botResponse = await processQueryResults(queryResult);
  if (reset) botResponse = { ...botResponse, reset: true } as any; // reset context

  return botResponse;
};

const resetContexts = () => {
  queryParams = {
    resetContexts: true,
    contexts: [],
  };
};

const processQueryResults = async (queryResult: any) => {
  const responses = await Promise.all(
    queryResult.fulfillmentMessages.map((response: any) => proccessEachResponse(response))
  );
  return {
    responses,
    raw: queryResult,
  };
};

const proccessEachResponse = async (response: any) => {
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

const processPayload = async (payload: any) => {
  if (payload.type?.stringValue?.toLowerCase() === 'video') {
    return {
      type: 'video',
      data: await getVideoData(payload),
    };
  }
  return null;
};

const getVideoData = async ({ select, source, tags }: any) => {
  select = select.stringValue;

  const request: IVideoRequest = { select };
  if (select === 'source') request.source = source?.stringValue?.toLowerCase();
  if (select === 'tags') {
    const tagsArray = tags?.listValue?.values;
    request.tags = tagsArray.map(({ stringValue }: { stringValue: string[] }) => stringValue);
  }
  return await getVideo(request);
};
