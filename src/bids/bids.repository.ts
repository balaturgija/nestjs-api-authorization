import { Injectable } from '@nestjs/common';
import { BidEntity } from './entities/bid.entity';

@Injectable()
export class BidsRepository {
    async create(offerPrice: number, userId: string, auctionId: string) {
        return await BidEntity.create({ offerPrice, userId, auctionId });
    }

    async getMaxByAuctionId(auctionId: string) {
        return await BidEntity.max('offerPrice', {
            where: { auctionId },
        });
    }

    async getWinner(auctionId: string) {
        const maxBet = await this.getMaxByAuctionId(auctionId);
        return await BidEntity.findOne({
            where: { auctionId: auctionId, offerPrice: maxBet },
        });
    }
}
