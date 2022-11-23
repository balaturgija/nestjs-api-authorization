import { RobotEntity } from '../entities/robot.entity';

export class CreateRobotModel {
    constructor(readonly id: string, readonly name: string) {}

    static formEntity(entity: RobotEntity) {
        return new CreateRobotModel(entity.id, entity.name);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}
