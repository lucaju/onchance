import mongoose from 'mongoose';

const connect = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI is undefined!');
    throw new Error('MONGO_URI is undefined!');
  }

  await mongoose
    .connect(process.env.MONGO_URI, { dbName: process.env.DATABASE })
    .catch((error) => {
      console.warn('ERROR connecting to MongoDB!');
      throw new Error(error);
    });
};

connect();
