import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsUUID } from 'class-validator';

export class RobotGetDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    name: string;

    @ApiProperty()
    @IsDefined()
    @IsUUID()
    batteryId: string;

    constructor({ id, name, batteryId }: any = {}) {
        this.id = id;
        this.name = name;
        this.batteryId = batteryId;
    }
}
