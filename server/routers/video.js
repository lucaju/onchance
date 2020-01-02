const express = require('express');
const differenceBy = require('lodash/fp/differenceBy');

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


const getVideo = conversation => {

	let selectedVideo;

	if (selectionType === 'subject') {
		selectedVideo = getVideoBySubject(conversation.bot);
	} else if (selectionType === 'sentiment') {
		selectedVideo =  videoSelectionNPL.getVideoBySentiment({
			msg: conversation.user,
			videoCollection,
			watchedCollection
		});
	} else if (selectionType === 'keyword') {
		selectedVideo = videoSelectionNPL.getVideoByKeyword({
			msg: conversation.user,
			videoCollection,
			watchedCollection
		});
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

	if (videosAvailable.length == 0) {
		return {
			error: 'No video found'
		};
	}

	//filter videos wathched
	let unwatchedVideos = differenceBy(watchedCollection, videosAvailable, 'subject');
	if (unwatchedVideos.length == 0) unwatchedVideos = videosAvailable; //if all videos were watched, pick a randomly among the available videos

	//select video
	const randomPick = Math.floor(Math.random() * Math.floor(unwatchedVideos.length - 1));
	const selectedVideo = unwatchedVideos[randomPick];

	return selectedVideo;
};

module.exports = router;