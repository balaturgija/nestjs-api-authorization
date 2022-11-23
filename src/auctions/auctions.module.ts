import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { AuctionsRepository } from './auctions.repository';

@Module({
    controllers: [AuctionsController],
    providers: [AuctionsService, AuctionsRepository],
})
export class AuctionsModule {}
