import { Injectable } from '@nestjs/common';
import { SortDirection } from '../../constants';
import { AuctionEntity } from '../entities/auction.entity';

@Injectable()
export class AuctionsRepository {
    async findAll(page: number, size: number, order: SortDirection) {
        return await AuctionEntity.findAndCountAll({
            order: [['createdAt', order]],
            offset: (page - 1) * size,
            limit: size,
        });
    }

    async create(robotId: string, startAmount: number) {
        return await AuctionEntity.create({ robotId, startAmount });
    }

    async findOne(id: string) {
        return await AuctionEntity.findByPk(id);
    }

    async existsById(id: string) {
        return await AuctionEntity.findByPk(id);
    }

    async existsByRobotId(robotId: string) {
        return await AuctionEntity.findOne({ where: { robotId: robotId } });
    }
}
