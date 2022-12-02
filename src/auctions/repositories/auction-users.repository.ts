import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { AuctionUserEntity } from '../entities/auction_user.entity';

@Injectable()
export class AuctionUsersRepository {
    async create(userId: string, auctionId: string) {
        return await AuctionUserEntity.create({
            userId: userId,
            auctionId: auctionId,
        });
    }

    async existsByAuctionIdAndUserId(auctionId: string, userId: string) {
        const entity = await AuctionUserEntity.findOne({
            where: { [Op.and]: [{ auctionId: auctionId }, { userId: userId }] },
        });
        return Boolean(entity);
    }
}
