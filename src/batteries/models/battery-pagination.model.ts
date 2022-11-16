import { BatteryModel } from './battery.model';

export class BatteryPaginationModel {
    constructor(
        readonly page: number,
        readonly size: number,
        readonly total: number,
        readonly items: BatteryModel[]
    ) {}
}
