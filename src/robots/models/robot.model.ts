import e from 'express';
import { RobotStatus } from '../../constants';
import { RobotEntity } from '../entities/robot.entity';

export class RobotModel {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly startPrice: number,
        readonly currentPrice: number,
        readonly status: RobotStatus,
        readonly batteryId: string,
        readonly userId: string
    ) {}

    static fromEntity(entity: RobotEntity) {
        return new RobotModel(
            entity.id,
            entity.name,
            entity.startPrice,
            entity.currentPrice,
            entity.status,
            entity.batteryId,
            entity.userId
        );
    }
}
