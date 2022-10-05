import { ApiProperty } from '@nestjs/swagger';

export class RobotDto implements Robot {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    batteryId: string;
}
