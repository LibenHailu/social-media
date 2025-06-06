import winston, { Logger } from "winston";
import { ElasticsearchTransformer, ElasticsearchTransport, LogData, TransformedData } from "winston-elasticsearch"

const esTransformer = (logData: LogData): TransformedData => {
    return ElasticsearchTransformer(logData)
}

const winstonLogger = (elasticsearchNode: string,  name: string, level: string): Logger => {
    const options = {
        console: {
            level, 
            handleExceptions: true,
            json: false, 
            colorize: true
        },
        elasticsearch:{
            level, 
            transformer: esTransformer,
            clientOpts: {
                node: elasticsearchNode, 
                log: level, 
                maxRetries: 2, 
                requestTimeout: 1000, 
                sniffOnStart: false
            }
        }
    }

    const esTransport: ElasticsearchTransport  = new ElasticsearchTransport(options.elasticsearch)
    const logger: Logger = winston.createLogger({
        exitOnError: false, 
        defaultMeta: {service: name}, 
        transports: [new winston.transports.Console(options.console), esTransport]
    })

    return logger
}

export {winstonLogger, Logger}