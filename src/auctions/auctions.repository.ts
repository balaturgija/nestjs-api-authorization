import { Injectable } from '@nestjs/common';
import { AuctionEntity } from './entities/auction.entity';

@Injectable()
export class AuctionsRepository {
    async create(robotId: string, startAmount: number) {
        return await AuctionEntity.create({ robotId, startAmount });
    }

    async findOne(id: string) {
        return await AuctionEntity.findByPk(id);
    }

    async exists(id: string) {
        return await AuctionEntity.findByPk(id);
    }
}
