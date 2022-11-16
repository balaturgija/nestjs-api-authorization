import { BatteryModel } from './battery.model';

export class BatteryPaginationModel {
    constructor(
        readonly size: number,
        readonly page: number,
        readonly total: number,
        readonly itesm: BatteryModel[]
    ) {}
}
