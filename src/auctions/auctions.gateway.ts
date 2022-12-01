import { Inject } from '@nestjs/common';
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
import { Socket, Server } from 'socket.io';
import { BidsService } from '../bids/bids.service';
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

    @WebSocketServer() wss: Server;

    afterInit(server: Server) {
        console.log('\x1b[46m Auctions Web socket initialized. \x1b[0m');
    }

    handleConnection(client: Socket & AuctionToken) {
        console.log(
            `Client connected with userId: ${client.user.id} and auctionId: ${client.auctionId}`
        );

        this.wss
            .to(client.auctionId)
            .emit(
                'notify',
                `${client.user.username} join on aution with id: ${client.auctionId} and ${client.user.wallet.amount} credits.`
            );
        client.join(client.auctionId);
        client.emit('joinRoom', `Welcome to room ${client.auctionId}`);
    }

    handleDisconnect(client: Socket & AuctionToken) {
        console.log(
            `Client disconnected with userId: ${client.user.id}, and auctionId: ${client.auctionId}`
        );

        this.wss
            .to(client.auctionId)
            .emit('notify', `${client.user.username} leave auction`);

        client.leave(client.auctionId);
    }

    @SubscribeMessage('bidServer')
    handleBid(
        @ConnectedSocket() client: Socket & AuctionToken,
        @MessageBody() body: any
    ) {
        this.wss.to(client.auctionId).emit('bidToClient', body);
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: Socket & AuctionToken) {
        client.leave(client.auctionId);
        client.emit('leftRoom', client.auctionId);
    }

    // @UsePipes(new RequestBodyValidatePipe())
    // @UseFilters(WsExceptionFilter)
    // @SubscribeMessage('bid')
    // async test(
    //     @ConnectedSocket() client: Socket & AuctionToken,
    //     @MessageBody() data: CreateBidDto,
    //     @AuthUser() authUser
    // ) {
    //     console.log({
    //         clientId: client.id,
    //         auctionId: client.auctionId,
    //     });
    //     this.wss.to(client.id).emit('sendBid', data);
    // }
}
