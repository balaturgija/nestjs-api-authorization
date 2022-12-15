import e from 'express';
import { RobotStatus } from '../../constants';
import { RobotEntity } from '../entities/robot.entity';

export class RobotModel {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly startPrice: number,
        readonly finalPrice: number,
        readonly status: RobotStatus,
        readonly creatorsSignature: string,
        readonly batteryId: string
    ) {}

    static fromEntity(entity: RobotEntity) {
        return new RobotModel(
            entity.id,
            entity.name,
            entity.startPrice,
            entity.finalPrice,
            entity.status,
            entity.creatorsSignature,
            entity.batteryId
        );
    }
}
