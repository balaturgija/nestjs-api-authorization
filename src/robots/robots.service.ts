import { Inject, Injectable } from '@nestjs/common';
import { Sequelize, Transaction } from 'sequelize';
import { Provider, RobotStatus } from '../constants';
import { CreateRobotModel } from './models/create-robot.model';
import { RobotPaginationModel } from './models/robot-pagination.model';
import { RobotModel } from './models/robot.model';
import { RobotsRepository } from './robots.repository';

@Injectable()
export class RobotsService {
    constructor(
        private readonly robotsRepository: RobotsRepository,
        @Inject(Provider.Sequelize) private readonly sequelize: Sequelize
    ) {}

    async create(
        name: string,
        startPrice: number,
        currentPrice: number,
        status: RobotStatus,
        creatorsSignature: string,
        batteryId: string,
        userId: string
    ) {
        const model = await this.robotsRepository.create(
            name,
            startPrice,
            currentPrice,
            status,
            creatorsSignature,
            batteryId,
            userId
        );
        return new CreateRobotModel(model.id, model.name);
    }

    async getById(id: string, t?: Transaction) {
        const robot = await this.robotsRepository.findOne(id, t);

        if (robot) return robot.get();

        return null;
    }

    async exists(id: string) {
        return await this.robotsRepository.exists(id);
    }

    async findAll(page: number, size: number, order: 'asc' | 'desc') {
        const result = await this.robotsRepository.paginate(page, size, order);
        return new RobotPaginationModel(
            page,
            size,
            result.count,
            result.rows.map((robot) => RobotModel.fromEntity(robot))
        );
    }

    async delete(id: string) {
        return await this.robotsRepository.delete(id);
    }

    async getRobots(userId: string) {
        const robots = await this.robotsRepository.findAllByUserId(userId);
        return robots.map((robot) => RobotModel.fromEntity(robot));
    }

    async checkStatus(id: string) {
        return await this.robotsRepository.checkStatus(id);
    }

    async changeUserId(
        id: string,
        userId: string,
        status: RobotStatus,
        t?: Transaction
    ) {
        return await this.robotsRepository.updateUserId(id, userId, status, t);
    }

    async getByUserId(userId: string, t?: Transaction) {
        return await this.robotsRepository.getByUserId(userId, t);
    }

    async changeFinalPrice(id: string, amount: number, t?: Transaction) {
        return await this.robotsRepository.changeFinalPrice(id, amount, t);
    }
}
