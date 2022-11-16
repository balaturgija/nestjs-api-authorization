import { BatteryModel } from './battery.model';

export class CreateBatteryResponseModel {
    constructor(readonly id: string, readonly name: string) {}

    static fromEntity(battery: BatteryModel) {
        return new CreateBatteryResponseModel(battery.id, battery.name);
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}
