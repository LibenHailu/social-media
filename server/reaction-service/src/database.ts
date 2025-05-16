import { winstonLogger } from '@liben_hailu/sm-shared';
import { Logger } from 'winston';
import { config } from './config';
import mongoose from 'mongoose';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'reactionDatabaseServer', 'debug');

const databaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${config.DATABASE_URL}`);
    log.info('Reaction service successfully connected to database.');
  } catch (error) {
    log.log('error', 'ReactionService databaseConnection() method error:', error);
  }
};

export { databaseConnection };