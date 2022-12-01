import { Inject, UseFilters, UsePipes } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server, Namespace } from 'socket.io';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
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

        this.io.emit(
            'hello',
            `${client.user.username} join on aution with id: ${client.auctionId} and ${client.user.wallet.amount} credits.`
        );
    }
    handleDisconnect(client: Socket & AuctionToken) {
        console.log(
            `Client disconnected with userId: ${client.user.id}, and auctionId: ${client.auctionId}`
        );
        console.log(`Number of connected sockets: ${this.io.sockets.size}`);
        this.io.emit('goodbye', client.user.username);
    }

    @UsePipes(new RequestBodyValidatePipe())
    @UseFilters(WsExceptionFilter)
    @SubscribeMessage('bid')
    async test(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: CreateBidDto,
        @AuthUser() authUser
    ) {
        client.broadcast.emit('dodo', data);
    }
}
