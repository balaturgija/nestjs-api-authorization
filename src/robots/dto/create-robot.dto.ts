import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class RobotCreateDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional()
    @IsNumber()
    @Min(1)
    currentPrice: number;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    batteryId: string;
}
