import client, { Channel } from 'amqplib';
import { winstonLogger, Logger } from '@liben_hailu/sm-shared';

import { config } from './../config';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationQueueConnection', 'debug');

async function createConnection(): Promise<Channel | undefined> {
    try {
        const connection = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
        const channel: Channel = await connection.createChannel();
        log.info('Notification service connected to queue successfully...');
        closeChannel(channel, connection);
        return channel;
    } catch (error) {
        log.log('error', 'NotificationService createConnection() method:', error);
        return undefined;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function closeChannel(channel: Channel, connection: any): void {
    process.once('SIGINT', async () => {
        await channel.close();
        await connection.close();
    });
}

export { createConnection };
