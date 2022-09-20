import { Repository } from 'sequelize-typescript';
import {
    ForeignKeyConstraintError,
    OrderItem,
    Transaction,
    UniqueConstraintError,
    UpdateOptions,
    ValidationError,
    WhereOptions,
} from 'sequelize';
import { ActionResult } from '../helpers/ActionResult';
import { CreateActionResult } from '../helpers/CreateActionResult';
import { Pager } from '../helpers/Pager';
import { PageResult } from '../helpers/PageResult';
import { SortDirection, Sorter } from '../helpers/Sorter';
import { BaseEntity } from './base.entity';

export class BaseService<T extends BaseEntity<T>> {
    constructor(private readonly repository: Repository<T>) {}

    async findAllAsync(pager?: Pager, sorter?: Sorter): Promise<PageResult<T>> {
        const orderBy: OrderItem[] = [
            ['id', sorter.direction() ? sorter.direction() : SortDirection.Asc],
        ];
        const options = {
            order: orderBy,
            limit: pager.pageSize(),
            offset: (pager.pageNumber() - 1) * pager.pageSize(),
        };
        const data = await this.repository.findAndCountAll(options);
        const result = new PageResult<T>(data.count, data.rows);
        return result;
    }

    async getByIdAsync(id: string, t?: Transaction): Promise<T | null> {
        const options = {};
        if (t) Object.assign(options, { transaction: t });
        return await this.repository.findByPk(id, options);
    }

    async createAsync(
        createDto: any,
        t?: Transaction
    ): Promise<CreateActionResult<T>> {
        const options = t ? { transaction: t } : undefined;
        const result = new CreateActionResult<T>();
        try {
            const createResult = await this.repository.create(
                createDto,
                options
            );
            result.data = JSON.parse(JSON.stringify(createResult));
        } catch (error) {
            result.AddError(this.handleDatabseErrors(error));
        }

        return result;
    }

    async putAsync(
        id: string,
        entity: Partial<T>,
        t?: Transaction
    ): Promise<ActionResult> {
        const options: UpdateOptions = { where: { id: id } };
        if (t) Object.assign(options, { transaction: t });
        const result = new ActionResult();
        try {
            await this.repository.update(entity, options);
        } catch (error) {
            result.AddError(this.handleDatabseErrors(error));
        }

        return result;
    }

    async deleteAsync(id: string, t?: Transaction): Promise<ActionResult> {
        const result = new ActionResult();
        const options: WhereOptions = { where: { id: id } };
        if (t) Object.assign(options, { transaction: t });
        try {
            await this.repository.destroy(options);
        } catch (error) {
            result.AddError(this.handleDatabseErrors(error));
        }
        return result;
    }

    protected handleDatabseErrors(error: any): string {
        let message: string;
        if (error instanceof ForeignKeyConstraintError) {
            message = `Foreign key constraint error on field ${error.fields}`;
        } else if (error instanceof UniqueConstraintError) {
            message = `Unique key constraint error ${error.errors
                .map((x) => x.message)
                .join(',')}`;
        } else if (error instanceof ValidationError) {
            message = error.errors.map((x) => x.message).join(',');
        } else {
            message = 'Database error caused.';
        }

        return message;
    }
}
