import { Injectable } from '@nestjs/common';
import { AuctionsRepository } from '../repositories/auctions.repository';

@Injectable()
export class AuctionsService {
    constructor(private readonly auctionsRepository: AuctionsRepository) {}
    async create(robotId: string, startAmount: number) {
        return await this.auctionsRepository.create(robotId, startAmount);
    }

    async getById(id: string) {
        const auction = await this.auctionsRepository.findOne(id);

        if (auction) return auction.get();

        return null;
    }

    async exists(id: string) {
        return await this.auctionsRepository.exists(id);
    }
}
