import { RobotModel } from './robot.model';

export class RobotPaginationModel {
    constructor(
        readonly page: number,
        readonly size: number,
        readonly total: number,
        readonly items: RobotModel[]
    ) {}
}
