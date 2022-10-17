import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class WalletParamsDto {
    @ApiProperty()
    @IsString()
    @IsUUID()
    id: string;
}
