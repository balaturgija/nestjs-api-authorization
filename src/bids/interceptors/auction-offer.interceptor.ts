import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuctionsService } from '../../auctions/services/auctions.service';
import { WalletBalanceException } from '../../wallets/exceptions/wallet-balance.exception';
import { WalletsService } from '../../wallets/wallets.service';
import { BidsService } from '../bids.service';
import { UnacceptableBidException } from '../exceptions/unacceptable-bid.exception';

export interface Response<T> {
    data: T;
}

@Injectable()
export class AuctionOfferInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    constructor(
        private readonly bidsService: BidsService,
        private readonly auctionsService: AuctionsService,
        private readonly walletsService: WalletsService
    ) {}
    async intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Promise<Observable<Response<T>>> {
        const body = context.getArgs()[1];
        const client = context.switchToWs().getClient();

        const offerPrice = body.offerPrice;

        const auction = await this.auctionsService.getById(client.auctionId);
        const wallet = await this.walletsService.getById(client.user.wallet.id);
        const highestBid = await this.bidsService.getMaxByAuctionId(auction.id);

        this.handleWallet(Number(offerPrice), Number(wallet.amount));
        this.handleBid(
            Number(offerPrice),
            Number(auction.currentAmount),
            Number(highestBid)
        );

        const data = next.handle().pipe(map((data) => ({ data })));
        return data;
    }

    handleWallet(offerPrice: number, amount: number) {
        if (amount < offerPrice) {
            throw new WalletBalanceException();
        }
    }

    handleBid(offerPrice: number, currentAmount: number, highestBid: number) {
        if (offerPrice <= currentAmount || offerPrice <= highestBid) {
            throw new UnacceptableBidException();
        }
    }
}
