import { Injectable } from '@nestjs/common';
import { BatteryEntity } from './entities/battery.entity';
import { CreateBatteryModel } from './models/create-battery.model';
import { BatteriesRepository } from './batteries.repository';
import { BatteryModel } from './models/battery.model';
import { BatteryPaginationModel } from './models/battery-pagination.model';
import { SortDirection } from '../constants';

@Injectable()
export class BatteriesService {
    constructor(private readonly batteriesRepository: BatteriesRepository) {}

    async findAll(page: number, size: number, order: SortDirection) {
        const result = await this.batteriesRepository.findAll(
            page,
            size,
            order
        );
        return new BatteryPaginationModel(
            size,
            page,
            result.count,
            result.rows.map((battery) => BatteryModel.fromEntity(battery))
        );
    }

    async create(name: string) {
        const model = await this.batteriesRepository.create(name);
        return new CreateBatteryModel(model.id, model.name);
    }

    async exists(id: string) {
        return await this.batteriesRepository.exists(id);
    }

    async update(id: string, name: string) {
        return await this.batteriesRepository.update(id, name);
    }

    async findOne(id: string): Promise<BatteryEntity | null> {
        const battery = await this.batteriesRepository.findOne(id);

        if (battery) return battery.get();

        return null;
    }

    async delete(id: string) {
        return await this.batteriesRepository.delete(id);
    }
}
