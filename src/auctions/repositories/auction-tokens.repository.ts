import { Injectable } from '@nestjs/common';
import { AuctionTokenEntity } from '../entities/auction-token.entity';

@Injectable()
export class AuctionTokensRepository {
    async create(token: string, userId: string, auctionId: string) {
        return await AuctionTokenEntity.create({
            token: token,
            userId: userId,
            auctionId: auctionId,
        });
    }

    async getTokenByUserIdAndAuctionId(userId: string, auctionId: string) {
        const auctionToken = await AuctionTokenEntity.findOne({
            where: { userId, auctionId },
            attributes: ['token'],
        });
        return auctionToken.token;
    }
}
