import { Inject, Injectable } from '@nestjs/common';
import { BatteryEntity } from './entities/battery.entity';
import { Repository } from 'sequelize-typescript';
import { Provider } from '../constants';
import { BaseService } from '../base/base.service';

@Injectable()
export class BatteriesService extends BaseService<BatteryEntity> {
  constructor(
    @Inject(Provider.BatteryRepository)
    private readonly batteryRepository: Repository<BatteryEntity>,
  ) {
    super(batteryRepository);
  }
}
