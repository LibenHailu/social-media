import { winstonLogger } from '@liben_hailu/sm-shared';
import { updateTotalDislikeCount, updateTotalLikeCount } from '..//services/post.service';
import { Channel, ConsumeMessage, Replies } from 'amqplib';
import { Logger } from 'winston';
import { config } from '../config';
import { createConnection } from '../queues/connection';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'usersServiceConsumer', 'debug');

const consumePostDirectMessage = async (channel: Channel): Promise<void> => {
    try {
        if (!channel) {
            channel = (await createConnection()) as Channel;
        }
        const exchangeName = 'sm-post-update';
        const routingKey = 'update-post';
        const queueName = 'post-update-queue';
        await channel.assertExchange(exchangeName, 'direct');
        const userQueue: Replies.AssertQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
        await channel.bindQueue(userQueue.queue, exchangeName, routingKey);
        channel.consume(userQueue.queue, async (msg: ConsumeMessage | null) => {
            const { type, postId, count } = JSON.parse(
                msg!.content.toString()
            );
            if (type === 'update-like-count') {
                await updateTotalLikeCount(`${postId}`, count);
            } else if (type === 'update-dislike-count') {
                await updateTotalDislikeCount(`${postId}`, count);
            }
            channel.ack(msg!);
        });
    } catch (error) {
        log.log('error', 'PostService PostConsumer consumePostDirectMessage() method error:', error);
    }
};

export { consumePostDirectMessage };

