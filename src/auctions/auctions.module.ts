import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { auctionsProviders } from './auctions.providers';

@Module({
    controllers: [AuctionsController],
    providers: [AuctionsService, ...auctionsProviders],
})
export class AuctionsModule {}
