import { Inject, Injectable } from '@nestjs/common';
import { BatteryEntity } from './entities/battery.entity';
import { Provider } from '../constants';
import { OrderItem, WhereOptions } from 'sequelize';
import { BatteryUpdateDto } from './dto/update-battery.dto';
import { BatteryFilterDto } from './dto/filter-battery.dto';
import { Pager } from '../base/utils/Pager';
import { PageResult } from '../base/utils/PageResult';
import { SortDirection, Sorter } from '../base/utils/Sorter';
import { toBatteryDto } from '../base/utils/Mapper';
import { CreateActionResult } from '../base/utils/CreateActionResult';
import { ActionResult } from '../base/utils/ActionResult';

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

    async createAsync(
        createBatteryDto: BatteryCreate
    ): Promise<CreateActionResult<Battery>> {
        const result = new CreateActionResult<Battery>();
        const createResult = await this.batteryRepository.create(
            createBatteryDto
        );
        if (!createResult) result.AddError('Battery not created.');

        return result;
    }

    async updateAsync(
        id: string,
        batteryUpdateDto: BatteryUpdateDto
    ): Promise<ActionResult> {
        const result = new ActionResult();
        const resultUpdate = await this.batteryRepository.update(
            batteryUpdateDto,
            {
                where: { id: id },
            }
        );

        if (resultUpdate[0] != 1) result.AddError('Error on update.');

        return result;
    }

    async deleteAsync(id: string): Promise<ActionResult> {
        const result = new ActionResult();
        const whereClause: WhereOptions = { where: { id: id } };
        const deleteResult =
            (await this.batteryRepository.destroy(whereClause)) > 0;

        if (!deleteResult) result.AddError('Error on delete');

        return result;
    }
}
