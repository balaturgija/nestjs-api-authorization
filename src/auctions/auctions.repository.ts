import { Injectable } from '@nestjs/common';
import { AuctionEntity } from './entities/auction.entity';

@Injectable()
export class AuctionsRepository {
    async create(robotId: string) {
        return await AuctionEntity.create(robotId);
    }
}
