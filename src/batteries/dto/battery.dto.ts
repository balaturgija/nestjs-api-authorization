import { ApiProperty } from '@nestjs/swagger';

export class BatteryDto implements Battery {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;
}
