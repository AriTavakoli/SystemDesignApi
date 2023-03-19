import "module-alias/register"
const mongoose = require('mongoose');
require('dotenv').config();
const winston = require('winston');






const MONGO_URI = process.env.MONGO_URI;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});


const connectToMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB database');
  } catch (error) {
    logger.error(`Error connecting to MongoDB database: ${error.message}`);
    process.exit(1);
  }
};

const disconnectFromMongoDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB database');
  } catch (error) {
    logger.error(`Error disconnecting from MongoDB database: ${error.message}`);
    process.exit(1);
  }
};

mongoose.connection.on('error', (error) => {
  logger.error(`MongoDB connection error: ${error.message}`);
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB disconnected');
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received. Disconnecting from MongoDB database...');
  await disconnectFromMongoDB();
  process.exit(0);
});


export { connectToMongoDB, disconnectFromMongoDB };

