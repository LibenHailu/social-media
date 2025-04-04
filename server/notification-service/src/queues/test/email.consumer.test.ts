import amqp from 'amqplib';

import * as connection from './../connection';
import { consumeAuthEmailMessages } from './../email.consumer';

jest.mock('./../connection');
jest.mock('amqplib');
jest.mock('@liben_hailu/sm-shared');

describe('Email Consumer', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('consumeAuthEmailMessages method', () => {
        it('should be called', async () => {
            const channel = {
                assertExchange: jest.fn(),
                publish: jest.fn(),
                assertQueue: jest.fn(),
                bindQueue: jest.fn(),
                consume: jest.fn(),
            };
            jest.spyOn(channel, 'assertExchange');
            jest.spyOn(channel, 'assertQueue').mockReturnValue({ queue: 'auth-email-queue', messageCount: 0, consumerCount: 0 });
            jest.spyOn(connection, 'createConnection').mockReturnValue(channel as never);
            const connectionChannel: amqp.Channel | undefined = await connection.createConnection();
            await consumeAuthEmailMessages(connectionChannel!);
            expect(connectionChannel!.assertExchange).toHaveBeenCalledWith('sm-email-notification', 'direct');
            expect(connectionChannel!.assertQueue).toHaveBeenCalledTimes(1);
            expect(connectionChannel!.consume).toHaveBeenCalledTimes(1);
            expect(connectionChannel!.bindQueue).toHaveBeenCalledWith('auth-email-queue', 'sm-email-notification', 'auth-email');
        });
    });

});