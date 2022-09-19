import { PartialType } from '@nestjs/swagger';
import { BatteryCreateDto } from './battery.create.dto';

export class BatteryUpdateDto extends PartialType(BatteryCreateDto) {}
