import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class UserParamsDto {
    @ApiProperty()
    @IsString()
    @IsUUID()
    id: string;
}
