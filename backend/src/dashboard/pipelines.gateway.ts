import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { Logger } from '@nestjs/common'

@WebSocketGateway({
    cors:  { origin: '*' }
})
export class PipelinesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server

    private logger = new Logger('PipelinesGateway')
    
    handleConnection(client: Socket){
        this.logger.log(`Client connected: ${client.id}`)
    }
    handleDisconnect(client: Socket){
        this.logger.log(`Client disconnected: ${client.id}`)
    }
    emitPipelinesUpdate(data: any){
        this.server.emit('pipelines_update', data)
    }
}