import express from 'express';
import Settings from '../db/models/settings';

const router = express.Router();
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
  const settings = await Settings.findOne();
  if (!settings) return res.status(404).send();
  res.status(200).json(settings);
});

export default router;
