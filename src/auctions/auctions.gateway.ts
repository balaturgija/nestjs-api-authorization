import { Inject, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
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
import { WsExceptionFilter } from '../base/filters/WsException.filter';
import { RequestBodyValidatePipe } from '../base/pipes/request-body-validation.pipe';
import { BidsService } from '../bids/bids.service';
import { CreateBidDto } from '../bids/dto/create-bid.dto';
import { AuctionOfferInterceptor } from '../bids/interceptors/auction-offer.interceptor';
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

    async handleConnection(client: Socket & AuctionToken) {
        const auction = await this.auctionsService.getById(client.auctionId);
        this.wss
            .to(client.auctionId)
            .emit(
                'notify',
                `${client.user.username} join on aution with id: ${auction.id} and ${client.user.wallet.amount} credits.`
            );
        client.join(auction.id);
        client.emit('joinRoom', `Welcome to room ${auction.id}`);
        client.emit('getPrice', `Current price is ${auction.currentAmount}`);
    }

    handleDisconnect(client: Socket & AuctionToken) {
        this.wss
            .to(client.auctionId)
            .emit('notify', `${client.user.username} leave auction.`);

        client.leave(client.auctionId);
    }

    @SubscribeMessage('bidSubmit')
    @UsePipes(RequestBodyValidatePipe)
    @UseFilters(WsExceptionFilter)
    @UseInterceptors(AuctionOfferInterceptor)
    async handleBid(
        @ConnectedSocket() client: Socket & AuctionToken,
        @MessageBody() body: CreateBidDto
    ) {
        const bid = await this.bidsService.create(
            body.offerPrice,
            client.user.id,
            client.auctionId
        );
        await this.auctionsService.updateCurrentAmount(
            client.auctionId,
            body.offerPrice
        );
        this.wss
            .to(client.auctionId)
            .emit('notify', `${client.user.username} offerd ${bid.offerPrice}`);
        this.wss
            .to(client.auctionId)
            .emit(
                'notify',
                `Leader bid is ${bid.offerPrice} set by ${client.user.username}`
            );
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
