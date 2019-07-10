const natural = require('natural');
const Analyzer = require('natural').SentimentAnalyzer;
const stemmer = require('natural').PorterStemmer;

const difference = require('lodash/fp/difference');
const differenceBy = require('lodash/fp/differenceBy');
const intersection = require('lodash/fp/intersection');

const videoCollection = require('./assets/video-collection.json');
// const collectionMetadata = require('./assets/collection-metadata.json');


const tokenizer = new natural.WordTokenizer();
const analyzer = new Analyzer('English', stemmer, 'afinn');

const watchedCollection = [];

const getVideo = conversation => {

	const videoBasedOnSubject = getVideoBySubject(conversation.bot);
	// const videoBasedOnSentiment = getVideoBySentiment(conversation.user);
	// const video = getVideoByKeyword(conversation.user);

	// console.log(video);

	return videoBasedOnSubject;

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

	//add video to wathed Collection
	watchedCollection.push(selectedVideo);

	// console.log(selectedVideo);

	return selectedVideo;
};

const getVideoBySentiment = msg => {

	//sentiment amnalysis
	const tokens = tokenizer.tokenize(msg.text);
	const sentiment = analyzer.getSentiment(tokens);
	console.log(sentiment);

	//filter videos by sentiment
	let videosAvailable = [];
	if (sentiment > 0) {
		videosAvailable = videoCollection.filter(video => video.sentiment >= sentiment);
	} else if (sentiment < 0) {
		videosAvailable = videoCollection.filter(video => video.sentiment <= sentiment);
	}

	//filter videos wathched
	let unwatchedVideos = difference(watchedCollection, videosAvailable);
	if (unwatchedVideos.length == 0) unwatchedVideos = videosAvailable; //if all videos were watched, pick a randomly among the available videos
	console.log(videosAvailable.length, watchedCollection.length, unwatchedVideos.length);

	//select video
	const randomPick = Math.floor(Math.random() * Math.floor(unwatchedVideos.length - 1));
	const selectedVideo = unwatchedVideos[randomPick];

	//add video to wathed Collection
	watchedCollection.push(selectedVideo);

	return selectedVideo;
};

const getVideoByKeyword = msg => {

	//sentiment amnalysis
	const tokens = tokenizer.tokenize(msg.text);

	//filter videos by keywords
	let videosAvailable = [];
	for (const video of videoCollection) {
		const kIntersection = intersection(tokens, video.keywords);
		if (kIntersection.length > 0) {
			video.keywordsMatched = kIntersection.length;
			videosAvailable.push(video);
		}
	}

	//filter videos wathched
	let unwatchedVideos = difference(watchedCollection, videosAvailable);
	if (unwatchedVideos.length == 0) unwatchedVideos = videosAvailable; //if all videos were watched, pick a randomly among the available videos
	console.log(videosAvailable.length, watchedCollection.length, unwatchedVideos.length);

	//find the max score
	const listScore = unwatchedVideos.map(k => k.keywordsMatched);
	const maxScore = (Math.max(...listScore));

	//filter by score
	unwatchedVideos = unwatchedVideos.filter(video => video.keywordsMatched == maxScore);

	//select video
	let selectedVideo = {};
	if (unwatchedVideos.length == 1) {
		selectedVideo = unwatchedVideos[0];
	} else {
		const randomPick = Math.floor(Math.random() * Math.floor(unwatchedVideos.length - 1));
		selectedVideo = unwatchedVideos[randomPick];
	}

	//add video to wathed Collection
	watchedCollection.push(selectedVideo);

	return selectedVideo;

};

exports.getVideo = getVideo;