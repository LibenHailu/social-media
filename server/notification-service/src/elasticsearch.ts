import { Client } from '@elastic/elasticsearch';
import { winstonLogger } from '@liben_hailu/sm-shared';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';
import { Logger } from 'winston';

import { config } from './config';

const elasticSearchClient = new Client({
    node: `${config.ELASTIC_SEARCH_URL}`
});

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationElasticSearchServe', 'debug');

export async function checkConnection(): Promise<void> {
    let isConnected = false;

    while (!isConnected) {
        try {
            const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
            log.info(`NotificationService ElasticSearch health status - ${health.status}`);
            isConnected = true;
        } catch (error) {
            log.error('Connecting to Elasticsearch failed. Retrying...');
            log.log('error', 'NotificationService checkConnection() method', error);
        }
    }
}
