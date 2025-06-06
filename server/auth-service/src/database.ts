import { Sequelize } from 'sequelize';
import { winstonLogger, Logger } from "@liben_hailu/sm-shared"
import { config } from './config';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'authDatabaseServer', 'debug');

export const sequelize: Sequelize = new Sequelize(process.env.MYSQL_DB!, {
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        multipleStatements: true,
    },
});

export async function databaseConnection(): Promise<void> {
    try {
        await sequelize.authenticate();
        log.info('AuthService Mysql database connection has been established successfully.');
    } catch (error) {
        log.error('Auth Service - Unable to connect to database.');
        log.log('error', 'AuthService databaseConnection() method error:', error);
    }
}