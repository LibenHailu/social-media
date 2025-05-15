import { IMessageDocument, Logger, winstonLogger } from "@liben_hailu/sm-shared";
import { Server } from "socket.io";
import { io, Socket as SocketClient } from "socket.io-client";
import { config } from "../config";

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'gatewaySocket', 'debug');
let chatSocketClient: SocketClient

export class SocketIOAppHandler {
    private io: Server

    constructor(io: Server) {
        this.io = io
        this.chatSocketServiceIOConnections()
    }

    public listen(): void {
        this.chatSocketServiceIOConnections()
        console.log(this.io)
    }

    private chatSocketServiceIOConnections() {
        chatSocketClient = io(`${config.MESSAGE_BASE_URL}`, { transports: ['websocket', 'polling'], secure: true })
        chatSocketClient.on('connect', () => {
            log.info('ChatService Chat Service socket connected')
        })

        chatSocketClient.on('disconnect', (reason: SocketClient.DisconnectReason) => {
            log.log('error', 'ChatService Chat Socket disconnect reason', reason)
            chatSocketClient.connect()
        })

        chatSocketClient.on('connect_error', (error: Error) => {
            log.log('error', 'ChatService Chat Socket connection error', error)
            chatSocketClient.connect()
        })

        // custom events
        chatSocketClient.on('message received', (data: IMessageDocument)=>{
            this.io.emit('message received', data)
        })
        chatSocketClient.on('message updated', (data: IMessageDocument)=>{
            this.io.emit('message updated', data)
        })
    }
}