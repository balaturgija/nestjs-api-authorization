import { BatteryEntity } from '../entities/battery.entity';

export class BatteryModel {
    constructor(readonly id: string, readonly name: string) {}

    static fromEntity(entity: BatteryEntity) {
        return new BatteryModel(entity.id, entity.name);
    }
}
