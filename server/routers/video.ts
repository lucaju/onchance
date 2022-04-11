import express from 'express';
import { getVideo, IVideoRequest } from '../videos';

const router = express.Router();
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

  const query = req.query as any;
  const select = Array.isArray(query.select) ? query.select[0] : query.select;

  const request: IVideoRequest = { select };

  if (req.query.source) request.source = query.source;
  if (req.query.tags) request.tags = query.tags.split(',');

  const video = await getVideo(request);

  if (!video) return res.status(404).json({ error: 'No video found' });
  res.status(200).json(video);
});

export default router;
