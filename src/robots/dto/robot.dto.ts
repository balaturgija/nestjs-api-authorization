import { ApiProperty } from '@nestjs/swagger';

export class RobotDto implements Robot {
    battery?: Battery;
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
    createorsSignature: string;

    @ApiProperty()
    batteryId: string;
}
