import { Inject, Injectable } from '@nestjs/common';
import { BatteryEntity } from './entities/battery.entity';
import { Provider } from '../constants';
import { OrderItem } from 'sequelize';
import { BatteryUpdateDto } from './dto/update-battery.dto';
import { BatteryFilterDto } from './dto/filter-battery.dto';
import { PageResult } from '../base/utils/PageResult.util';
import { SortDirection, Sorter } from '../base/utils/Sorter.util';
import { toBatteryDto } from '../base/utils/Mapper.util';
import { BatteryCreateDto } from './dto/create-battery.dto';
import { Pager } from '../base/utils/Pager.util';

@Injectable()
export class BatteriesService {
    constructor(
        @Inject(Provider.BatteryRepository)
        private readonly batteryRepository: typeof BatteryEntity
    ) {}

    async findAllAsync(query: BatteryFilterDto): Promise<PageResult<Battery>> {
        const pager = new Pager(query.page, query.rpp);
        const sorter = new Sorter(query.sortBy, query.sortDirection);
        let orderBy: OrderItem[] = [
            ['id', sorter.direction() ? sorter.direction() : SortDirection.Asc],
        ];

        if (sorter.orderBy() === 'name')
            orderBy = [
                [
                    'name',
                    sorter.direction() ? sorter.direction() : SortDirection.Asc,
                ],
            ];

        if (sorter.orderBy() === 'created_at')
            orderBy = [
                [
                    'created_at',
                    sorter.direction() ? sorter.direction() : SortDirection.Asc,
                ],
            ];

        const options = {
            order: orderBy,
            limit: pager.pageSize(),
            offset: (pager.pageNumber() - 1) * pager.pageSize(),
        };
        const data = await this.batteryRepository.findAndCountAll(options);
        const result = new PageResult<Battery>(
            data.count,
            data.rows.map((x) => toBatteryDto(x))
        );
        return result;
    }

    async getByIdAsync(id: string): Promise<Battery | null> {
        const result = await this.batteryRepository.findByPk(id);
        return toBatteryDto(result);
    }

    async createAsync(createBatteryDto: BatteryCreateDto): Promise<Battery> {
        const result = await this.batteryRepository.create(createBatteryDto);
        return toBatteryDto(result);
    }

    async putAsync(
        id: string,
        robotUpdateDto: BatteryUpdateDto
    ): Promise<boolean> {
        return (
            (
                await this.batteryRepository.update(robotUpdateDto, {
                    where: { id: id },
                })
            )[0] > 0
        );
    }

    async deleteAsync(id: string): Promise<boolean> {
        return (
            (await this.batteryRepository.destroy({ where: { id: id } })) > 0
        );
    }
}
