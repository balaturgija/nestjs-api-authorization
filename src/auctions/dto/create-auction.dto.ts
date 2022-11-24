import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateAuctionDto {
    @ApiProperty()
    @IsNumber()
    @Min(1)
    startAmount: number;
}
