import { PartialType } from '@nestjs/swagger';
import { BatteryCreateDto } from './create-battery.dto';

export class BatteryUpdateDto extends PartialType(BatteryCreateDto) {}
