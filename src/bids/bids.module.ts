import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { BidsRepository } from './bids.repository';

@Module({
    controllers: [BidsController],
    providers: [BidsService, BidsRepository],
    exports: [BidsService],
})
export class BidsModule {}
