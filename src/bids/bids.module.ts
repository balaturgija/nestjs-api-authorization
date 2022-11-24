import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { BidsGateway } from './bids.gateway';
import { BidsRepository } from './bids.repository';

@Module({
    controllers: [BidsController],
    providers: [BidsService, BidsGateway, BidsRepository],
})
export class BidsModule {}
