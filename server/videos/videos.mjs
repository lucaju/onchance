/* eslint-disable no-use-before-define */
import Video from '../models/video.mjs';
import { getSentiment } from '../nlp/sentiment.mjs';

let watchedCollection = []; // Store watched videos

export const getVideo = async ({ select, source, tags, text }) => {
	let selectedVideo;

	if (select === 'source') selectedVideo = await bySourceFile(source);
	if (select === 'tags') selectedVideo = await byTags(tags);
	if (select === 'sentiment') selectedVideo = await bySentiment(text);

	if (!selectedVideo) return { error: 'No video found' };

	const hasBeenWatched = watchedCollection.includes(selectedVideo);
	if (!hasBeenWatched) watchedCollection = [...watchedCollection, selectedVideo];

	return selectedVideo;
};

const bySourceFile = async (source) => {
	return await Video.findOne({ source }).catch(() => undefined);
};

const byTags = async (tags) => {
	let videosAvailable = await Video.find({ tags: { $all: tags } }).catch(() => undefined);
	videosAvailable = filterWatchedVideos(videosAvailable); // filter videos wathched
	return randonPick(videosAvailable); // randomly select video
};

const bySentiment = async (text) => {
	// TO DO
	const sentiment = getSentiment(text);
	let videosAvailable = await Video.find({ sentiment }).catch(() => undefined);
	videosAvailable = filterWatchedVideos(videosAvailable); // filter videos wathched
	return randonPick(videosAvailable); // randomly select video
};

const filterWatchedVideos = (videosAvailable) => {
	const unwatchedVideos = videosAvailable.filter((video) => {
		if (!watchedCollection.includes(video)) return video;
	});
	if (unwatchedVideos.length === 0) return videosAvailable; // if all videos were watched, send all available videos back
	return unwatchedVideos;
};

const randonPick = (videosAvailable) => {
	const randomPick = getRandomIntInclusive(0, videosAvailable.length - 1);
	return videosAvailable[randomPick];
};

const getRandomIntInclusive = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
};
