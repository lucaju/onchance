import natural from 'natural';

const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;

const tokenizer = new natural.WordTokenizer();
const analyzer = new Analyzer('English', stemmer, 'afinn');

// sentiment amnalysis
export const getSentiment = (msg) => {
	const tokens = tokenizer.tokenize(msg);
	const sentiment = analyzer.getSentiment(tokens);
	return sentiment;
};
