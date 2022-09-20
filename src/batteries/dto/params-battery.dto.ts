import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class BatteryParamsDto {
    @ApiProperty()
    @IsString()
    @IsUUID()
    id: string;
}
