import { Injectable } from '@nestjs/common';
import { CreateAuctionTokenModel } from '../models/create-auction-token.model';
import { AuctionTokensRepository } from '../repositories/auction-tokens.repository';

@Injectable()
export class AuctionTokensServices {
    constructor(
        private readonly auctionTokensRepository: AuctionTokensRepository
    ) {}

    async create(token: string, userId: string, auctionId: string) {
        const model = await this.auctionTokensRepository.create(
            token,
            userId,
            auctionId
        );
        return new CreateAuctionTokenModel(model.id, model.token);
    }

    async getExistingToken(userId: string, auctionId: string) {
        const auctionToken =
            await this.auctionTokensRepository.getTokenByUserIdAndAuctionId(
                userId,
                auctionId
            );

        if (auctionToken) return auctionToken;

        return null;
    }
}
