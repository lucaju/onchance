const natural = require('natural');
const Analyzer = require('natural').SentimentAnalyzer;
const stemmer = require('natural').PorterStemmer;

const difference = require('lodash/fp/difference');
const intersection = require('lodash/fp/intersection');

const tokenizer = new natural.WordTokenizer();
const analyzer = new Analyzer('English', stemmer, 'afinn');

const getVideoBySentiment = ({msg, videoCollection, watchedCollection}) => {

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

	return selectedVideo;
};

const getVideoByKeyword = ({msg, videoCollection, watchedCollection}) => {

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

	return selectedVideo;

};

exports.getVideoBySentiment = getVideoBySentiment;
exports.getVideoByKeyword = getVideoByKeyword;