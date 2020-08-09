import mongoose from 'mongoose';

if (!process.env.MONGO_URI) {
	console.warn('MONGO_URI is undefined!');
	throw new Error('MONGO_URI is undefined!');
}

const connect = async () => {
	await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
		dbName: process.env.DATABASE
	}).catch(error => {
		console.warn('ERROR connecting to MongoDB!');
		throw new Error(error);
	});
};

connect();
