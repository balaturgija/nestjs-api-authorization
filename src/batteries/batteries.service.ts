import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Provider } from 'src/constants';
import { BatteryEntity } from './entities/battery.entity';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class BatteriesService extends BaseService<BatteryEntity> {
  constructor(
    @Inject(Provider.BatteryRepository)
    private readonly batteryRepository: Repository<BatteryEntity>,
  ) {
    super(batteryRepository);
  }
}
