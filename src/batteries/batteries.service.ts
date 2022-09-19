import { Inject, Injectable } from '@nestjs/common';
import { BatteryEntity } from './entities/battery.entity';
import { Provider } from '../constants';
import { ActionResult } from '../helpers/ActionResult';
import { BatteryCreate } from './interfaces/batteryCreate.interface';
import { WhereOptions } from 'sequelize';
import { Battery } from './interfaces/battery.interface';
// import { Repository } from 'sequelize-typescript';
// import { BaseService } from '../base/base.service';

@Injectable()
// extends BaseService<BatteryEntity>
export class BatteriesService {
  constructor(
    @Inject(Provider.BatteryRepository)
    private readonly batteryRepository: typeof BatteryEntity, // private readonly batteryRepository: Repository<BatteryEntity>,
  ) {
    // super(batteryRepository);
  }

  async getByIdAsync(id: string): Promise<Battery | null> {
    return await this.batteryRepository.findByPk(id);
  }

  async createAsync(createBatteryDto: BatteryCreate): Promise<ActionResult> {
    const result = new ActionResult();
    const createResult = await this.batteryRepository.create(createBatteryDto);
    if (!createResult) result.AddError('Battery not created.');

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
