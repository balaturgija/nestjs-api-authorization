import { ApiProperty } from '@nestjs/swagger';

export class CreateAuctionDto {
    @ApiProperty()
    robotId: string;
}
