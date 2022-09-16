import { Inject, Injectable } from '@nestjs/common';
import { BatteryEntity } from './entities/battery.entity';
import { Provider } from '../constants';
import { ActionResult } from '../helpers/ActionResult';
import { BatteryCreate } from './interfaces/batteryCreate.interface';
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

  async createAsync(createBatteryDto: BatteryCreate): Promise<ActionResult> {
    const result = new ActionResult();
    const createResult = await this.batteryRepository.create(createBatteryDto);
    if (!createResult) result.AddError('Battery not created.');

    return result;
  }
}
