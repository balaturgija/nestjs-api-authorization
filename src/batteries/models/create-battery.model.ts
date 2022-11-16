import { BatteryEntity } from '../entities/battery.entity';

export class CreateBatteryModel {
    constructor(readonly id: string, readonly name: string) {}

    static fromEntity(entity: BatteryEntity) {
        return new CreateBatteryModel(entity.id, entity.name);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}
