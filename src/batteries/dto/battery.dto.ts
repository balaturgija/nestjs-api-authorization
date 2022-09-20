import { ApiProperty } from '@nestjs/swagger';
import { Battery } from '../interfaces/battery.interface';

export class BatteryDto implements Battery {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;
}
