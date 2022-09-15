import { BadGatewayException } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import {
  ForeignKeyConstraintError,
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
import { Sorter } from '../helpers/Sorter';
import { BaseEntity } from './base.entity';
import { IBaseService } from './IBaseService';

export class BaseService<T extends BaseEntity<T>> implements IBaseService<T> {
  constructor(private readonly genericRepository: Repository<T>) {}

  async findAllAsync(
    pager?: Pager,
    sorter?: Sorter,
    whereClause?: object,
    include?: string[],
  ): Promise<PageResult<T>> {
    const options = {
      raw: true,
    };

    if (pager != null) {
      Object.assign(options, {
        limit: pager.pageSize(),
        offset: (pager.pageNumber() - 1) * pager.pageSize(),
      });
    }

    if (sorter != null) {
      include = include ?? [];
      const sortOrder = this.constructSorter(sorter, include);

      Object.assign(options, {
        order: sortOrder,
      });
    }

    if (whereClause != null) {
      Object.assign(options, {
        where: whereClause,
      });
    }

    Object.assign(options, this.constructInclude(include));
    try {
      const result = await this.genericRepository.findAndCountAll(options);
      return new PageResult<T>(
        result.count,
        JSON.parse(JSON.stringify(result.rows)),
      );
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAsync(
    id: string,
    include?: string[],
    t?: Transaction,
  ): Promise<T | null> {
    const options = this.constructInclude(include);
    if (t) Object.assign(options, { transaction: t });
    const result = await this.genericRepository.findByPk(id, options);
    return result ? JSON.parse(JSON.stringify(result)) : null;
  }

  async createAsync(
    entity: any,
    t?: Transaction,
  ): Promise<CreateActionResult<T>> {
    const options = t ? { transaction: t } : undefined;
    const result = new CreateActionResult<T>();
    try {
      const createResult = await this.genericRepository.create(entity, options);
      result.data = JSON.parse(JSON.stringify(createResult));
    } catch (error) {
      result.AddError(this.handleDatabseErrors(error));
    }

    return result;
  }

  async putAsync(
    entity: Partial<T>,
    id: string,
    t?: Transaction,
  ): Promise<ActionResult> {
    const options: UpdateOptions = { where: { id: id } };
    if (t) Object.assign(options, { transaction: t });
    const result = new ActionResult();
    try {
      await this.genericRepository.update(entity, options);
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
      await this.genericRepository.destroy(options);
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

  protected constructSorter(sorter: Sorter, include?: string[]): any[] {
    const sorterResult: any = [];
    const splited = sorter.orderBy().split('.');
    const splitedCap = splited.map((x) => {
      return x;
    });

    const newInclude = splitedCap.slice(0, splited.length - 1).join('.');
    if (newInclude && (!include || !include.find((x) => newInclude === x))) {
      if (!include) {
        include = [newInclude];
      } else {
        include.push(newInclude);
      }
      sorterResult.push([...splitedCap, sorter.direction()]);
      return sorterResult;
    }
  }

  protected constructInclude(include?: string[]) {
    if (include && include.length > 0) {
      const models: any = [];
      include.forEach((i) => {
        const sliced = i.split('.');
        const existingModel = models.find((x: any) => x.model == i[0]);
        if (sliced.length === 1) {
          if (!existingModel)
            models.push({
              model: sliced[0],
            });
        } else {
          if (existingModel) {
            Object.assign(existingModel, { include: sliced[1] });
          } else {
            models.push({ model: sliced[0], include: sliced[1] });
          }
        }
      });
      return Object.assign({}, { include: models });
    }
    return {};
  }
}
