import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize/types';
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

    async findOne(id: string, t?: Transaction) {
        return await RobotEntity.findByPk(id, { transaction: t });
    }

    async paginate(page: number, size: number, order: 'asc' | 'desc') {
        return await RobotEntity.findAndCountAll({
            order: [['id', order]],
            offset: (page - 1) * size,
            limit: size,
        });
    }

    async update(id: string, name: string) {
        return await RobotEntity.update({ name }, { where: { id } });
    }

    async updateUserId(
        id: string,
        userId: string,
        status: RobotStatus,
        t?: Transaction
    ) {
        return await RobotEntity.update(
            { userId: userId, status: status },
            { where: { id }, transaction: t }
        );
    }

    async exists(id: string) {
        const entity = await RobotEntity.findByPk(id);
        return Boolean(entity);
    }

    async delete(id: string) {
        return await RobotEntity.destroy({ where: { id } });
    }

    async findAllByUserId(userId: string, t?: Transaction) {
        return await RobotEntity.findAll({
            where: { userId: userId },
            transaction: t,
        });
    }

    async checkStatus(id: string) {
        const entity = await RobotEntity.findByPk(id);
        return entity.status;
    }

    async getByUserId(userId: string, t?: Transaction) {
        return await RobotEntity.findOne({
            where: { userId: userId },
            transaction: t,
        });
    }

    async changeFinalPrice(id: string, amount: number, t?: Transaction) {
        return await RobotEntity.update(
            { finalPrice: amount },
            { where: { id: id }, transaction: t }
        );
    }
}
