import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class RobotParamsDto {
    @ApiProperty()
    @IsString()
    @IsUUID()
    id: string;
}
