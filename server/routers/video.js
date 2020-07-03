const express = require('express');
const differenceBy = require('lodash/fp/differenceBy');
const intersection = require('lodash/fp/intersection');

const videoSelectionNPL = require('./video-selection-npl');

const videoCollection = require('../../videography/video-collection.json');
// const collectionMetadata = require('./assets/collection-metadata.json');

const router = new express.Router();

const selectionType = 'subject'; // ["subject", "sentiment", "keyword"]
let watchedCollection = [];


router.use(express.json());

router.post('/getVideo', async (req, res) => {
	const data = req.body;
	console.log(data);
	// const video = await videoSelection.getVideo(data);
	const video = getVideo(data);
	res.json(video);
});


const getVideo = ({bot, user}) => {

	console.log(bot);

	if (bot.action.subject) selectionType === 'subject';
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
		selectedVideo = videoSelectionNPL.getVideoByKeyword({
			msg: user,
			videoCollection,
			watchedCollection
		});
	} else if (selectionType === 'filename') {
		selectedVideo = getVideoByFileName(bot.action.file);
	}

	//add video to wathed Collection
	watchedCollection.push(selectedVideo);

	return selectedVideo;

};

const getVideoBySubject = bot => {

	if (bot.subjects.length == 0) {
		return {
			error: 'No subject'
		};
	}

	const videosAvailable = videoCollection.filter(video => video.subject[0].toLowerCase() == bot.subjects[0].toLowerCase());
	// console.log(videosAvailable);

	if (videosAvailable.length == 0) { return { error: 'No video found' }; };

	//if keywords
	if (bot.actions.keyword) {
		videosAvailable.filter((video) => {
			bot.actions.keyword.match(video.keywords.join(' '));
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


const getVideoByFileName = (filename) => {
	const selectedVideo = videoCollection.find((video) => video.fileName.toLocaleLowerCase() === filename.toLocaleLowerCase());
	if (!selectedVideo) { return { error: 'No video found' }; };
	return selectedVideo;
};

module.exports = router;