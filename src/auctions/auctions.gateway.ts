import { Inject, UseFilters, UsePipes } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server, Namespace } from 'socket.io';
import { WsExceptionFilter } from '../base/filters/WsException.filter';
import { RequestBodyValidatePipe } from '../base/pipes/request-body-validation.pipe';
import { BidsService } from '../bids/bids.service';
import { CreateBidDto } from '../bids/dto/create-bid.dto';
import { AuctionsService } from './services/auctions.service';

@WebSocketGateway({
    namespace: 'auctions',
})
export class AuctionsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    constructor(
        private readonly auctionsService: AuctionsService,
        private readonly bidsService: BidsService,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

    @WebSocketServer() io: Namespace;

    afterInit(server: Server) {
        console.log('\x1b[46m Auctions Web socket initialized. \x1b[0m');
    }
    handleConnection(client: Socket & AuctionToken) {
        console.log(
            `Client connected with userId: ${client.user.id} and auctionId: ${client.auctionId}`
        );
        console.log(`Number of connected sockets: ${this.io.sockets.size}`);

        this.io.emit('hello', `Welcome to auction id: ${client.auctionId}`);
    }
    handleDisconnect(client: Socket & AuctionToken) {
        console.log(
            `Client disconnected with userId: ${client.user.id}, and auctionId: ${client.auctionId}`
        );
        console.log(`Number of connected sockets: ${this.io.sockets.size}`);
        this.io.emit('hello', client.auctionId);
    }

    @UsePipes(new RequestBodyValidatePipe())
    @UseFilters(new WsExceptionFilter())
    @SubscribeMessage('bid')
    async test(client, data: CreateBidDto) {
        const event = 'events';
        // console.log({ data: data, event: event, client: client });
        return { event, data };
    }
}
