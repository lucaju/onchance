import express from 'express';
import Settings from '../models/settings.mjs';

const router = new express.Router();
router.use(express.json());

/**
 * * GET Settings
 *
 * @async
 * @function
 * @param {String} req.query Query
 * @returns {Object} res.body Settings
 * @example
 */

router.get('/settings', async (req, res) => {
	const settings = await Settings.findOne().catch(() => undefined);
	if (!settings) return res.status(404);
	res.status(200).json(settings);
});

export default router;
