import { winstonLogger } from '@liben_hailu/sm-shared';
import client, { Channel } from 'amqplib';
import { Logger } from 'winston';
import { config } from '../config';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'followQueueConnection', 'debug');

async function createConnection(): Promise<Channel | undefined> {
  try {
    const connection = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
    const channel: Channel = await connection.createChannel();
    log.info('Follow server connected to queue successfully...');
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', 'FollowService createConnection() method error:', error);
    return undefined;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function closeConnection(channel: Channel, connection: any): void {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
}

export { createConnection };
