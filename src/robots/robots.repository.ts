import { Injectable } from '@nestjs/common';
import { RobotStatus } from '../constants';
import { RobotEntity } from './entities/robot.entity';

@Injectable()
export class RobotsRepository {
    async create(
        name: string,
        startPrice: number,
        finalPrice: number,
        status: RobotStatus,
        creatorsSignature: string,
        batteryId: string,
        userId: string
    ) {
        return await RobotEntity.create({
            name,
            startPrice,
            finalPrice,
            status,
            creatorsSignature,
            batteryId,
            userId,
        });
    }

    async findOne(id: string) {
        return await RobotEntity.findByPk(id);
    }

    async paginate(page: number, size: number, order: 'asc' | 'desc') {
        return await RobotEntity.findAndCountAll({
            order: [['id', order]],
            offset: (page - 1) * size,
            limit: size,
        });
    }

    async update(id: string, name: string) {
        return RobotEntity.update({ name }, { where: { id } });
    }

    async exists(id: string) {
        const entity = await RobotEntity.findByPk(id);
        return Boolean(entity);
    }

    async delete(id: string) {
        return await RobotEntity.destroy({ where: { id } });
    }

    async getByUserId(userId: string) {
        return await RobotEntity.findAll({ where: { userId: userId } });
    }

    async checkStatus(id: string) {
        const entity = await RobotEntity.findByPk(id);
        return entity.status;
    }
}
