import { BadGatewayException } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import {
  ForeignKeyConstraintError,
  Transaction,
  UniqueConstraintError,
  UpdateOptions,
  ValidationError,
  WhereOptions,
} from 'sequelize/types';
import { ActionResult } from 'src/helpers/ActionResult';
import { CreateActionResult } from 'src/helpers/CreateActionResult';
import { BaseEntity } from './base.entity';
import { IBaseService } from './IBaseService';

export class BaseService<T extends BaseEntity<T>> implements IBaseService<T> {
  constructor(private readonly genericRepository: Repository<T>) {}
  async getAll(): Promise<T[]> {
    try {
      return await this.genericRepository.findAll();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async get(id: string): Promise<T | null> {
    try {
      return await this.genericRepository.findByPk(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async create(entity: any, t?: Transaction): Promise<CreateActionResult<T>> {
    const options = t ? { transaction: t } : undefined;
    const result = new CreateActionResult<T>();
    try {
      const createResult = await this.genericRepository.create(entity, options);
      //result.data = entity to dto;
    } catch (error) {
      result.AddError(this.HandleDatabseErrors(error));
    }

    return result;
  }
  async put(
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
      result.AddError(this.HandleDatabseErrors(error));
    }

    return result;
  }

  async delete(id: string) {
    try {
      const whereOptions: WhereOptions = { id: id };
      return (await this.genericRepository.destroy(whereOptions)[0]) > 0;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  protected HandleDatabseErrors(error: any): string {
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
