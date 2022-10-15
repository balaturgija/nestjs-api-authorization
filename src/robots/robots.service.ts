import { Inject, Injectable } from '@nestjs/common';
import { OrderItem, WhereOptions } from 'sequelize';
import { ActionResult } from '../base/utils/ActionResult';
import { CreateActionResult } from '../base/utils/CreateActionResult';
import { toRobtDto } from '../base/utils/Mapper';
import { Pager } from '../base/utils/Pager';
import { PageResult } from '../base/utils/PageResult';
import { SortDirection, Sorter } from '../base/utils/Sorter';
import { Provider } from '../constants';
import { RobotCreateDto } from './dto/create-robot.dto';
import { RobotFilterDto } from './dto/filter-robot.dto';
import { RobotUpdateDto } from './dto/update-robot.dto';
import { RobotEntity } from './entities/robot.entity';
import { RobotService } from './interface/robot-service.interface';

@Injectable()
export class RobotsService implements RobotService {
    constructor(
        @Inject(Provider.RobotRepository)
        private readonly robotRepository: typeof RobotEntity
    ) {}

    async findAllAsync(query: RobotFilterDto): Promise<PageResult<Robot>> {
        const pager = new Pager(query.page, query.rpp);
        const sorter = new Sorter(query.sortBy, query.sortDirection);
        const orderBy: OrderItem[] = [
            ['id', sorter.direction() ? sorter.direction() : SortDirection.Asc],
        ];

        const options = {
            order: orderBy,
            limit: pager.pageSize(),
            offset: (pager.pageNumber() - 1) * pager.pageSize(),
        };

        const data = await this.robotRepository.findAndCountAll(options);
        return new PageResult<Robot>(
            data.count,
            data.rows.map((x) => toRobtDto(x))
        );
    }

    async getByIdAsync(id: string): Promise<Robot | null> {
        const result = await this.robotRepository.findByPk(id);
        return toRobtDto(result);
    }

    async createAsync(createBatteryDto: RobotCreateDto): Promise<Robot> {
        return await this.robotRepository.create(createBatteryDto);
    }

    async putAsync(
        id: string,
        batteryUpdateDto: RobotUpdateDto
    ): Promise<boolean> {
        return (
            (
                await this.robotRepository.update(batteryUpdateDto, {
                    where: { id: id },
                })
            )[0] > 0
        );
    }

    async deleteAsync(id: string): Promise<boolean> {
        return (await this.robotRepository.destroy({ where: { id: id } })) > 0;
    }
}
