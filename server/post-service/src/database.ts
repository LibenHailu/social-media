import { winstonLogger } from '@liben_hailu/sm-shared';
import { Logger } from 'winston';
import { config } from './config';
import mongoose from 'mongoose';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'postsDatabaseServer', 'debug');

const databaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${config.DATABASE_URL}`);
    log.info('Post service successfully connected to database.');
  } catch (error) {
    log.log('error', 'PostService databaseConnection() method error:', error);
  }
};

export { databaseConnection };