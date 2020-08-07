import { createRequire } from 'module';

import { bySourceFile, byTags, bySentiment } from './selection/index.mjs';

const require = createRequire(import.meta.url);
const videoCollection = require('../../video-collection/video-collection.json');

let watchedCollection = [];

export const getVideo = ({ select, source , tags, text }) => {

	let videosAvailable;
	let selectedVideo;

	if (select === 'source') videosAvailable = bySourceFile({source, videoCollection});
	if (select === 'tags') videosAvailable = byTags({tags, videoCollection});
	if (select === 'sentiment') videosAvailable = bySentiment({text, videoCollection});
	
	if (videosAvailable === null) return { error: 'No video found' };

	if (select === 'source') {
		selectedVideo = videosAvailable;
	} else {
		videosAvailable = filterWatchedVideos(videosAvailable); //filter videos wathched
		selectedVideo = randonPick(videosAvailable); //randomly select video
	}

	//add to watched list
	const hasBeenWatched = watchedCollection.includes(selectedVideo);
	if (!hasBeenWatched) watchedCollection = [...watchedCollection, selectedVideo];
	
	return selectedVideo;
};

const filterWatchedVideos = (videosAvailable) => {
	const unwatchedVideos = videosAvailable.filter((video) => {
		if (!watchedCollection.includes(video)) return video;
	});
	if (unwatchedVideos.length == 0) return videosAvailable; //if all videos were watched, send all available videos back
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
