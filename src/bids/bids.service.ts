import { Injectable } from '@nestjs/common';
import { BidsRepository } from './bids.repository';
import { CreateBidDto } from './dto/create-bid.dto';

@Injectable()
export class BidsService {
    constructor(readonly bidsRepository: BidsRepository) {}
    create(createBidDto: CreateBidDto) {
        return 'This action adds a new bid';
    }

    async join(bidId: string) {
        return 'This action adds a new join';
    }
}
