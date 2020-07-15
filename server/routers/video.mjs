import express from 'express';
import { getVideo } from '../videos/videos.mjs';

const router = new express.Router();
router.use(express.json());

/**
 * * GET new message to DialogFlow
 *
 * @async
 * @function
 * @param {String} req.body.msg user input
 * @returns {Object} res.body dialogflow response
 * @example
 */
router.get('/', (req, res) => {
	if (!req.query.subject && !req.query.keyword) {
		return res.status(400).send();
	}

	const request = {};

	if (req.query.keyword) {
		request.mode = 'keyword';
		request.keyword = req.query.keyword.toLowerCase();
	}

	if (req.query.subject) {
		request.mode = 'subject';
		request.subject = req.query.subject.toLowerCase();
	}

	const video = getVideo(request);

	if (video.error) return res.status(404).json(video);

	res.status(200).json(video);
});

router.get('/subject/:subject/:keyword', (req, res) => {
	const request = {
		mode: 'subject',
		subject: req.params.subject.toLowerCase(),
	};

	if (req.params.keyword) req.params.keyword.toLowerCase();

	const video = getVideo(request);

	if (video.error) return res.status(404).json(video);

	res.status(200).json(video);
});

router.get('/subject/:subject', (req, res) => {
	const video = getVideo({
		mode: 'subject',
		subject: req.params.subject.toLowerCase(),
	});

	if (video.error) return res.status(404).json(video);

	res.status(200).json(video);
});

router.get('/keyword/:keyword', (req, res) => {
	const keyword = req.params.keyword;

	const video = getVideo({
		mode: 'keyword',
		keyword: keyword.toLowerCase(),
	});

	if (video.error) return res.status(404).json(video);

	res.status(200).json(video);
});

router.post('/bysentiment', (req, res) => {
	const video = getVideo({
		mode: 'sentiment',
		msg: req.body.msg,
	});

	if (video.error) return res.status(404).json(video);

	res.status(200).json(video);
});

export default router;
