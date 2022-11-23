import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBatteryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}
