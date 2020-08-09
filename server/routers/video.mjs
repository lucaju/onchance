import express from 'express';
import { getVideo } from '../videos/videos.mjs';

const router = new express.Router();
router.use(express.json());

/**
 * * GET video
 *
 * @async
 * @function
 * @param {String} req.query Query: select:STRING, tags:ARRAY, source:STRING, sentiment:NUMMBER
 * @returns {Object} res.body Video Metadata
 * @example
 */

router.get('/', async (req, res) => {
	if (!req.query.select) return res.status(400).send();

	const request = { select: req.query.select };

	if (req.query.source) request.source = req.query.source;
	if (req.query.tags) request.tags = req.query.tags.split(',');

	const video = await getVideo(request);

	if (video.error) return res.status(404).json(video);
	res.status(200).json(video);
});

export default router;
