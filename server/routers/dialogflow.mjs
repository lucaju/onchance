import express from 'express';

import { sendDialog } from '../dialogflow/middleware.mjs';

const router = new express.Router();
router.use(express.json());

/**
 * * POST new message to DialogFlow
 *
 * @async
 * @function
 * @param {String} req.body.msg user input
 * @returns {Object} res.body dialogflow response
 * @example
 */
router.post('/', async ({ body }, res) => {
	const dialogflowResponse = await sendDialog(body.msg);
	res.send(dialogflowResponse);
});

export default router;
