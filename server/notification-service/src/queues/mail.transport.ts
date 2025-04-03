import { winstonLogger, IEmailLocals } from '@liben_hailu/sm-shared';
import { config } from '@/config';
import { emailTemplates } from '@/helpers';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'mailTransport', 'debug');

async function sendEmail(template: string, receiverEmail: string, locals: IEmailLocals): Promise<void> {
    try {
        emailTemplates(template, receiverEmail, locals);
        log.info('Email sent successfully.');
    } catch (error) {
        log.log('error', 'NotificationService MailTransport sendEmail() method error:', error);
    }
}

export { sendEmail };