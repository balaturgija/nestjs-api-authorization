import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
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

    async existsByAuctionIdAndUserId(auctionId: string, userId: string) {
        const entity = await AuctionTokenEntity.findOne({
            where: { [Op.and]: [{ auctionId: auctionId }, { userId: userId }] },
        });
        return Boolean(entity);
    }
}
