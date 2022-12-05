import { Injectable } from '@nestjs/common';
import { AuctionEntity } from '../entities/auction.entity';

@Injectable()
export class AuctionsRepository {
    async paginate(page: number, size: number, order: 'asc' | 'desc') {
        return await AuctionEntity.findAndCountAll({
            order: [['createdAt', order]],
            offset: (page - 1) * size,
            limit: size,
        });
    }

    async create(robotId: string, startAmount: number) {
        return await AuctionEntity.create({
            robotId: robotId,
            startAmount: startAmount,
            currentAmount: startAmount,
        });
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

    async updateCurrentAmount(id: string, currentAmount: number) {
        return await AuctionEntity.update(
            { currentAmount: currentAmount },
            { where: { id: id } }
        );
    }

    async updateFinalAmount(id: string, finalAmount: number) {
        return await AuctionEntity.update(
            { finalAmount: finalAmount },
            { where: { id: id } }
        );
    }
}
