import { Injectable } from '@nestjs/common';
import { BatteryEntity } from './entities/battery.entity';

@Injectable()
export class BatteriesRepository {
    async create(name: string) {
        return BatteryEntity.create({
            name,
        });
    }

    async findOne(id: string) {
        return await BatteryEntity.findByPk(id);
    }

    async paginate(page: number, size: number, order: 'asc' | 'desc') {
        return await BatteryEntity.findAndCountAll({
            order: [['id', order]],
            offset: (page - 1) * size,
            limit: size,
        });
    }

    async update(id: string, name: string) {
        return BatteryEntity.update(
            {
                name,
            },
            {
                where: {
                    id,
                },
            }
        );
    }

    async exists(id: string): Promise<boolean> {
        const entity = await BatteryEntity.findByPk(id);
        return Boolean(entity);
    }

    async delete(id: string) {
        return await BatteryEntity.destroy({
            where: { id: id },
        });
    }
}
