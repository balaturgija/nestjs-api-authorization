import { BadGatewayException } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { WhereOptions } from 'sequelize/types';
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
  async get(id: string): Promise<T> {
    try {
      return await this.genericRepository.findByPk(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async create(entity: any): Promise<T> {
    try {
      return await this.genericRepository.create(entity);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async put(entity: BaseEntity<T>, id: string): Promise<boolean> {
    try {
      const whereOptions: WhereOptions = { id: id };
      return (
        (await this.genericRepository.update(entity, {
          where: { id: id },
        })[0]) > 0
      );
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async delete(id: string) {
    try {
      const whereOptions: WhereOptions = { id: id };
      return (await this.genericRepository.destroy(whereOptions)[0]) > 0;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
