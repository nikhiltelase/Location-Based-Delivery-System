import mongoose from 'mongoose';

/**
 * Establishes a connection to the MongoDB database.
 * @async
 * @function connectDatabase
 * @throws {Error} If connection to MongoDB fails.
 */
const connectDatabase = async () => {
  try {
    const dbURI = process.env.MONGODB_URI;

    if (!dbURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    await mongoose.connect(dbURI);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectDatabase;
