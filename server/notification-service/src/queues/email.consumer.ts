import { config } from '@/config';
import { IEmailLocals, winstonLogger } from '@liben_hailu/sm-shared';
import { Channel, ConsumeMessage } from 'amqplib';
import { Logger } from 'winston';
import { createConnection } from '@/queues/connection';
import { sendEmail } from '@/queues/mail.transport';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'emailConsumer', 'debug');

async function consumeAuthEmailMessages(channel: Channel): Promise<void> {
    try {
        if (!channel) {
            channel = await createConnection() as Channel;
        }
        const exchangeName = 'sm-email-notification';
        const routingKey = 'auth-email';
        const queueName = 'auth-email-queue';
        await channel.assertExchange(exchangeName, 'direct');
        const jobberQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
        await channel.bindQueue(jobberQueue.queue, exchangeName, routingKey);
        channel.consume(jobberQueue.queue, async (msg: ConsumeMessage | null) => {
            const { receiverEmail, username, verifyLink, resetLink, template, otp } = JSON.parse(msg!.content.toString());
            const locals: IEmailLocals = {
                appLink: `${config.CLIENT_URL}`,
                username,
                verifyLink,
                resetLink,
                otp
            };
            await sendEmail(template, receiverEmail, locals);
            channel.ack(msg!);
        });
    } catch (error) {
        log.log('error', 'NotificationService EmailConsumer consumeAuthEmailMessages() method error:', error);
    }
}

export {consumeAuthEmailMessages}