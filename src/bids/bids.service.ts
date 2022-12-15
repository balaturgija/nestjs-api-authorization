import { Injectable } from '@nestjs/common';
import { BidsRepository } from './bids.repository';
import { CreateBidModel } from './models/create-bid.model';

@Injectable()
export class BidsService {
    constructor(readonly bidsRepository: BidsRepository) {}
    async create(offerPrice: number, userId: string, auctionId: string) {
        const model = await this.bidsRepository.create(
            offerPrice,
            userId,
            auctionId
        );
        return new CreateBidModel(model.id, model.offerPrice);
    }

    async getMaxByAuctionId(auctionId: string) {
        return await this.bidsRepository.getMaxByAuctionId(auctionId);
    }

    async getWinner(auctionId: string) {
        const bid = await this.bidsRepository.getWinner(auctionId);

        if (bid) return bid.get();

        return null;
    }
}
