import { Inject, Injectable } from '@nestjs/common';
import { BatteryEntity } from './entities/battery.entity';
import { Provider } from '../constants';
import { ActionResult } from '../helpers/ActionResult';
import { BatteryCreate } from './interfaces/battery.create.interface';
import { OrderItem, WhereOptions } from 'sequelize';
import { Battery } from './interfaces/battery.interface';
import { BatteryUpdateDto } from './dto/update-battery.dto';
import { Pager } from '../helpers/Pager';
import { SortDirection, Sorter } from '../helpers/Sorter';
import { PageResult } from '../helpers/PageResult';
import { CreateActionResult } from '../helpers/CreateActionResult';

@Injectable()
export class BatteriesService {
    constructor(
        @Inject(Provider.BatteryRepository)
        private readonly batteryRepository: typeof BatteryEntity
    ) {}

    async findAllAsync(
        pager?: Pager,
        sorter?: Sorter
    ): Promise<PageResult<Battery>> {
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
        const result = new PageResult<Battery>(data.count, data.rows);
        return result;
    }

    async getByIdAsync(id: string): Promise<Battery | null> {
        return await this.batteryRepository.findByPk(id);
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
