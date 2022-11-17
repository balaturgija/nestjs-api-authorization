import { Injectable } from '@nestjs/common';
import { BatteryEntity } from './entities/battery.entity';
import { SortDirection } from '../base/utils/Sorter.util';
import { CreateBatteryModel } from './models/create-battery.model';
import { BatteriesRepository } from './batteries.repository';
import { BatteryModel } from './models/battery.model';
import { BatteryPaginationModel } from './models/battery-pagination.model';

@Injectable()
export class BatteriesService {
    constructor(private readonly batteryRepository: BatteriesRepository) {}

    async findAll(page: number, size: number, order: SortDirection) {
        const result = await this.batteryRepository.findAll(page, size, order);
        return new BatteryPaginationModel(
            size,
            page,
            result.count,
            result.rows.map((battery) => BatteryModel.fromEntity(battery))
        );
    }

    async create(name: string) {
        const model = await this.batteryRepository.create(name);
        return new CreateBatteryModel(model.id, model.name);
    }

    async exists(id: string) {
        return await this.batteryRepository.exists(id);
    }

    async update(id: string, name: string) {
        return await this.batteryRepository.update(id, name);
    }

    async findOne(id: string): Promise<BatteryEntity | null> {
        const battery = await this.batteryRepository.find(id);

        if (battery) return battery.get();

        return null;
    }

    async delete(id: string) {
        return await this.batteryRepository.delete(id);
    }
}
