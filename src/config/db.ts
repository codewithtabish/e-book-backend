import mongoose from 'mongoose';
import { config } from './config';

const connectWithDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('connected to mongodb');
    });
    mongoose.connection.on('error', (err) => {
      console.log('The mongoose connection error is ', err);
    });
    await mongoose.connect(config.DBURL as string);
  } catch (error) {
    console.log('The mongoose connection error is ', error);
    process.exit(1);
  }
};

export default connectWithDB;
