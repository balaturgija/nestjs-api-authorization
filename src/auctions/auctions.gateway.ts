import {
    Inject,
    UseFilters,
    UseGuards,
    UseInterceptors,
    UsePipes,
} from '@nestjs/common';
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
import { Roles } from '../auth/decorators/role.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { WsExceptionFilter } from '../base/filters/WsException.filter';
import { RequestBodyValidatePipe } from '../base/pipes/request-body-validation.pipe';
import { BidsService } from '../bids/bids.service';
import { CreateBidDto } from '../bids/dto/create-bid.dto';
import { AuctionOfferInterceptor } from '../bids/interceptors/auction-offer.interceptor';
import { Role } from '../constants';
import { UsersService } from '../users/users.service';
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
        private readonly usersService: UsersService,
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
                `${client.user.username} join on aution withId: ${auction.id}, connection id: ${client.id} and ${client.user.wallet.amount} credits.`
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
    @UseFilters(WsExceptionFilter)
    @UsePipes(RequestBodyValidatePipe)
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

    @SubscribeMessage('endAuction')
    @UseFilters(WsExceptionFilter)
    @UseGuards(RoleGuard)
    @Roles(Role.Engineer)
    async endAuction(@ConnectedSocket() client: Socket & AuctionToken) {
        // this logic should be handl by interceptor
        await this.auctionsService.getByIdAndUserId(
            client.auctionId,
            client.user.id
        );
        // send notify and pronounce a winner
        const winningBid = await this.bidsService.getWinner(client.auctionId);
        const winner = await this.usersService.getById(winningBid.userId);
        this.wss
            .to(client.auctionId)
            .emit(
                'notify',
                `Auction has been ended and the winner is ${winner.username}`
            );

        // transfer money & send robot to winner
        await this.auctionsService.swapMoneyAndRobot(
            winningBid.offerPrice,
            winningBid.auctionId,
            winningBid.userId
        );
        await this.auctionsService.updateFinalAmount(
            client.auctionId,
            winningBid.offerPrice
        );
        await this.auctionsService.delete(client.auctionId);

        this.wss.to(client.auctionId).disconnectSockets();
    }
}
