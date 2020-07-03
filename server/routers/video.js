const express = require('express');
const differenceBy = require('lodash/fp/differenceBy');

const videoSelectionNPL = require('./video-selection-npl');

const videoCollection = require('../../videography/video-collection.json');
// const collectionMetadata = require('./assets/collection-metadata.json');

const router = new express.Router();

const selectionType = 'subject'; // ["subject", "sentiment", "keyword", "filename"]
let watchedCollection = [];


router.use(express.json());

router.post('/getVideo', async (req, res) => {
	const data = req.body;
	// const video = await videoSelection.getVideo(data);
	const video = getVideo(data);
	res.json(video);
});


const getVideo = ({bot, user}) => {

	if (bot.action.subject) selectionType === 'subject';
	if (bot.action.keyword && !bot.action.subject) selectionType === 'keyword';
	if (bot.action.file) selectionType === 'filename';

	let selectedVideo;

	if (selectionType === 'subject') {
		selectedVideo = getVideoBySubject(bot);
	} else if (selectionType === 'sentiment') {
		selectedVideo =  videoSelectionNPL.getVideoBySentiment({
			msg: user,
			videoCollection,
			watchedCollection
		});
	} else if (selectionType === 'keyword') {
		selectedVideo = getVideoByKeyword(bot);
	} else if (selectionType === 'filename') {
		selectedVideo = getVideoByFileName(bot);
	}

	//add video to wathed Collection
	watchedCollection.push(selectedVideo);

	return selectedVideo;

};

const getVideoBySubject = ({action}) => {

	const subject = action.subject.toLowerCase();

	const videosAvailable = videoCollection.filter((video) => {
		const videoSubjects = video.subject.join(' ').toLowerCase();
		return videoSubjects === subject;
	});

	if (videosAvailable.length == 0) { return { error: 'No video found' }; }

	//if keywords
	if (action.keyword) {
		const botKeywords = action.keyword.toLowerCase();
		videosAvailable.filter((video) => {
			const videoKeywords = video.keywords.join(' ').toLowerCase();
			botKeywords.match(videoKeywords);
		});
	}

	//filter videos wathched
	let unwatchedVideos = differenceBy(watchedCollection, videosAvailable, 'subject');
	if (unwatchedVideos.length == 0) unwatchedVideos = videosAvailable; //if all videos were watched, pick a randomly among the available videos

	//select video
	const randomPick = Math.floor(Math.random() * Math.floor(unwatchedVideos.length - 1));
	const selectedVideo = unwatchedVideos[randomPick];

	return selectedVideo;
};

const getVideoByKeyword = ({action}) => {

	const botKeywords = action.keyword.toLowerCase();

	const videosAvailable = videoCollection.filter((video) => {
		const videoKeywords = video.keywords.join(' ').toLowerCase();
		botKeywords.match(videoKeywords);
	});

	if (videosAvailable.length == 0) { return { error: 'No video found' }; }

	//filter videos wathched
	let unwatchedVideos = differenceBy(watchedCollection, videosAvailable, 'subject');
	if (unwatchedVideos.length == 0) unwatchedVideos = videosAvailable; //if all videos were watched, pick a randomly among the available videos

	//select video
	const randomPick = Math.floor(Math.random() * Math.floor(unwatchedVideos.length - 1));
	const selectedVideo = unwatchedVideos[randomPick];

	return selectedVideo;
};


const getVideoByFileName = ({action}) => {
	const fileName = action.fileName.toLowerCase();
	const selectedVideo = videoCollection.find((video) => (
		video.fileName.toLowerCase() === fileName
	));
	if (!selectedVideo) { return { error: 'No video found' }; }
	return selectedVideo;
};

module.exports = router;