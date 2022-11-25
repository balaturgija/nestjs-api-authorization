import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server, Namespace } from 'socket.io';
import { AuctionsService } from './services/auctions.service';

@WebSocketGateway({
    namespace: 'auctions',
})
export class AuctionsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    constructor(private readonly auctionsService: AuctionsService) {}

    @WebSocketServer() io: Namespace;

    afterInit(server: Server) {
        console.log('\x1b[46m Auctions Web socket initialized. \x1b[0m');
    }
    handleConnection(client: Socket & AuctionToken) {
        console.log(
            `Client connected with userId: ${client.user.id} and auctionId: ${client.auctionId}`
        );
        console.log(`Number of connected sockets: ${this.io.sockets.size}`);

        this.io.emit('hello', client.auctionId);
    }
    handleDisconnect(client: Socket & AuctionToken) {
        console.log(
            `Client disconnected with userId: ${client.user.id}, and auctionId: ${client.auctionId}`
        );
        console.log(`Number of connected sockets: ${this.io.sockets.size}`);
        this.io.emit('hello', client.auctionId);
    }
}
