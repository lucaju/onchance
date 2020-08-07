import natural from 'natural';

const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;

const tokenizer = new natural.WordTokenizer();
const analyzer = new Analyzer('English', stemmer, 'afinn');

export const bySentiment = ({ videoCollection, msg }) => {
	//sentiment amnalysis
	const tokens = tokenizer.tokenize(msg);
	const sentiment = analyzer.getSentiment(tokens);
	// console.log(sentiment);

	//filter videos by sentiment
	let videosAvailable = [];
	videosAvailable = videoCollection.filter((video) =>
		sentiment > 0 ? video.sentiment >= sentiment : video.sentiment <= sentiment
	);

	if (videosAvailable.length == 0) return null;

	return videosAvailable;
};
