import { Inject, Injectable } from '@nestjs/common';
import { OrderItem, Transaction } from 'sequelize';
import { Pager } from '../base/utils/Pager.util';
import { PageResult } from '../base/utils/PageResult.util';
import { SortDirection, Sorter } from '../base/utils/Sorter.util';
import { Provider } from '../constants';
import { RobotEntity } from '../robots/entities/robot.entity';
import { UserRobotsFilterDto } from '../users/dto/filter-user-robots.dto';
import { UserRobotsEntity } from './entities/user-robots.entity';

@Injectable()
export class UserRobotsService {
    constructor(
        @Inject(Provider.UserRobotsRepository)
        private readonly userRobotsRepository: typeof UserRobotsEntity
    ) {}
    async getByUserId(query: UserRobotsFilterDto, userId: string) {
        const pager = new Pager(query.page, query.rpp);
        const sorter = new Sorter(query.sortBy, query.sortDirection);
        let orderBy: OrderItem[] = [
            ['id', sorter.direction() ? sorter.direction() : SortDirection.Asc],
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
            where: { userId: userId },
            include: [{ model: RobotEntity }],
        };

        const data = await this.userRobotsRepository.findAndCountAll(options);
        const result = new PageResult<Robot>(
            data.count,
            data.rows.map((x) => {
                return x.robot;
            })
        );

        return result;
    }

    async create(robotId: string, userId: string, t?: Transaction) {
        await this.userRobotsRepository.create(
            { robotId, userId },
            { transaction: t }
        );
    }
}
