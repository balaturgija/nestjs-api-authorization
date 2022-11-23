import { Injectable } from '@nestjs/common';
import { AuctionsRepository } from './auctions.repository';

@Injectable()
export class AuctionsService {
    constructor(private readonly auctionsRepository: AuctionsRepository) {}
    async create(robotId: string) {
        return await this.auctionsRepository.create(robotId);
    }
}
