import { PorterStemmer, SentimentAnalyzer, WordTokenizer } from 'natural';

const Analyzer = SentimentAnalyzer;
const stemmer = PorterStemmer;

const tokenizer = new WordTokenizer();
const analyzer = new Analyzer('English', stemmer, 'afinn');

// sentiment amnalysis
export const getSentiment = (msg: string) => {
  const tokens = tokenizer.tokenize(msg);
  const sentiment = analyzer.getSentiment(tokens);
  return sentiment;
};
