import { ApiProperty } from '@nestjs/swagger';

export class RobotDto implements Robot {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    startPrice: number;

    @ApiProperty()
    currentPrice: number;

    @ApiProperty()
    status: string;

    @ApiProperty()
    creatorsSignature: string;

    @ApiProperty()
    batteryId: string;

    @ApiProperty()
    battery?: Battery;
}
