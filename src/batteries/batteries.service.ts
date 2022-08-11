import { Inject, Injectable } from '@nestjs/common';
import { Provider } from 'src/constants';
import { BatteryEntity } from './entities/battery.entity';

@Injectable()
export class BatteriesService {
  constructor(
    @Inject(Provider.BatteryRepository)
    private batteryRepository: typeof BatteryEntity,
  ) {}

  async findAllAsync(): Promise<BatteryEntity[]> {
    return await this.batteryRepository.findAll();
  }
}
