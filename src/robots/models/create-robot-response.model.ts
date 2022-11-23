import { RobotModel } from './robot.model';

export class CreateRobotResponseModel {
    constructor(readonly id: string, readonly name: string) {}

    static fromEntity(entity: RobotModel) {
        return new CreateRobotResponseModel(entity.id, entity.name);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}
