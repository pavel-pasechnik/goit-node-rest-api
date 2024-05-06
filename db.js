import mongoose from 'mongoose';
import 'dotenv/config';

const DB_URI = process.env.DB_URI;

export default async function connect() {
  try {
    await mongoose.connect(DB_URI);
    console.log('Database connection successful');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

connect();
