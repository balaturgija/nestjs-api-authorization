import { Controller, Get } from '@nestjs/common';
import { BatteriesService } from './batteries.service';
import { BatteryGetDto } from './dto/battery-get.dto';

@Controller('batteries')
export class BatteriesController {
  constructor(private batteriesService: BatteriesService) {}

  @Get()
  async findAllAsync(): Promise<BatteryGetDto[]> {
    const batteries = await this.batteriesService.findAllAsync();
    const dtos = batteries.map((battery) => new BatteryGetDto(battery));
    return dtos;
  }
}
