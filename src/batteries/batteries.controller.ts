import { Controller, Get, Inject } from '@nestjs/common';
import { BatteriesService } from './batteries.service';
import { BatteryGetDto } from './dto/battery-get.dto';

@Controller('batteries')
export class BatteriesController {
  constructor(
    @Inject(BatteriesService)
    private readonly batteriesService: BatteriesService,
  ) {}

  @Get()
  async findAllAsync(): Promise<BatteryGetDto[]> {
    const batteries = await this.batteriesService.getAll();
    const dtos = batteries.map((battery) => new BatteryGetDto(battery));
    return dtos;
  }
}
