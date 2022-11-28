import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
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

    async getById(id: string) {
        const robot = await this.robotsRepository.findOne(id);

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
        const robots = await this.robotsRepository.getByUserId(userId);
        return robots.map((robot) => RobotModel.fromEntity(robot));
    }

    async checkStatus(id: string) {
        return await this.robotsRepository.checkStatus(id);
    }
}
