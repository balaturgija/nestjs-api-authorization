import { IsString, IsUUID } from 'class-validator';

export class JoinBidDto {
    @IsString()
    @IsUUID()
    bidId: string;
}
