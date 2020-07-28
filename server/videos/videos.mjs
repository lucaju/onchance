import { createRequire } from 'module';

import differenceBy from 'lodash/fp/differenceBy.js';
import { bySubject, byKeyword, byFilename, bySentiment } from './selection/index.mjs';

const require = createRequire(import.meta.url);
const videoCollection = require('../../video-collection/video-collection.json');

let watchedCollection = [];

export const getVideo = (request) => {
	let videosAvailable;

	const req = { ...request, videoCollection };

	if (request.mode === 'subject') videosAvailable = bySubject(req);
	if (request.mode === 'keyword') videosAvailable = byKeyword(req);
	if (request.mode === 'sentiment') videosAvailable = bySentiment(req);
	if (request.mode === 'filename') {
		const video = byFilename(req);
		if (video.error) return video;
		watchedCollection = [...watchedCollection, video];
		return video;
	}

	if (videosAvailable.length === 0) return { error: 'No video found' };

	videosAvailable = filterWatchedVideos(videosAvailable); //filter videos wathched
	const selectedVideo = randonPick(videosAvailable); //select video
	watchedCollection = [...watchedCollection, selectedVideo]; //add video to wathed Collection

	return selectedVideo;
};

const filterWatchedVideos = (videosAvailable) => {
	const unwatchedVideos = differenceBy(watchedCollection, videosAvailable, 'subject');
	if (unwatchedVideos.length == 0) return videosAvailable; //if all videos were watched, pick a randomly among the available videos
	return unwatchedVideos;
};

const randonPick = (videosAvailable) => {
	const randomPick = getRandomIntInclusive(0, videosAvailable.length - 1);
	return videosAvailable[randomPick];
};

const getRandomIntInclusive = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};
