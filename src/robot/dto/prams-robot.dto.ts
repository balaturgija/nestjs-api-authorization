import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class RobotParamDto {
    @ApiProperty()
    @IsString()
    @IsUUID()
    id: string;
}
