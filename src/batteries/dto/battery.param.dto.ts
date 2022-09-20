import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class BatteryParamDto {
    @ApiProperty()
    @IsString()
    @IsUUID()
    id: string;
}
