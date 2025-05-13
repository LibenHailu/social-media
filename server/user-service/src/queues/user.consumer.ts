import { createUser, updateTotalFollowersCount, updateTotalFollowingCount } from '../services/user.service';
import { IUserDocument, winstonLogger } from '@liben_hailu/sm-shared';
import { Channel, ConsumeMessage, Replies } from 'amqplib';
import { Logger } from 'winston';
import { config } from '../config';
import { createConnection } from '../queues/connection';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'usersServiceConsumer', 'debug');

const consumeUserDirectMessage = async (channel: Channel): Promise<void> => {
    try {
        if (!channel) {
            channel = (await createConnection()) as Channel;
        }
        const exchangeName = 'sm-user-update';
        const routingKey = 'update-user';
        const queueName = 'user-update-queue';
        await channel.assertExchange(exchangeName, 'direct');
        const jobberQueue: Replies.AssertQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
        await channel.bindQueue(jobberQueue.queue, exchangeName, routingKey);
        channel.consume(jobberQueue.queue, async (msg: ConsumeMessage | null) => {
            const { type, userId, count } = JSON.parse(
                msg!.content.toString()
            );
            if (type === 'auth') {
                const { username, fullName, email, description, profilePicture, country, createdAt } = JSON.parse(msg!.content.toString());
                const user: IUserDocument = {
                    fullName,
                    username,
                    email,
                    profilePicture,
                    country,
                    description,
                    createdAt
                };
                await createUser(user);
            } else if (type === 'update-follower-count') {
                await updateTotalFollowersCount(`${userId}`, count);
            } else if (type === 'update-following-count') {
                await updateTotalFollowingCount(`${userId}`, count);
            }
            channel.ack(msg!);
        });
    } catch (error) {
        log.log('error', 'UsersService UserConsumer consumeSellerDirectMessage() method error:', error);
    }
};

export { consumeUserDirectMessage };

