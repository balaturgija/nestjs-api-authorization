import { ApiProperty } from '@nestjs/swagger';
import { Robot } from '../interfaces/robot.interface';

export class RobotDto implements Robot {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    batteryId: string;
}
