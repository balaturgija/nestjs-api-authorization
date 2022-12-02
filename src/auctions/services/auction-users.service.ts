import { Injectable } from '@nestjs/common';
import { CreateAuctionUserModel } from '../models/create-auction-user.model';
import { AuctionUsersRepository } from '../repositories/auction-users.repository';

@Injectable()
export class AuctionUsersServices {
    constructor(
        private readonly auctionUsersRepository: AuctionUsersRepository
    ) {}

    async create(userId: string, auctionId: string) {
        const model = await this.auctionUsersRepository.create(
            userId,
            auctionId
        );
        return new CreateAuctionUserModel(
            model.id,
            model.userId,
            model.auctionId
        );
    }

    async existsByAuctionIdAndUserId(auctionId: string, userId: string) {
        return await this.auctionUsersRepository.existsByAuctionIdAndUserId(
            auctionId,
            userId
        );
    }
}
