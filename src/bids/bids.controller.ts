import { Controller, Post, Body, Inject, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TableName } from '../constants';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { JoinBidDto } from './dto/join-bid.dto';

@Controller('bids')
export class BidsController {
    constructor(
        private readonly bidsService: BidsService,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

    @Post()
    @ApiTags(TableName.Bids)
    async create(@Body() createBidDto: CreateBidDto) {
        const bid = await this.bidsService.create(createBidDto);

        return this.serializer.serialize('bids', bid);
    }

    @Post('join')
    async join(@Body() joinBidDto: JoinBidDto) {
        const result = await this.bidsService.join(joinBidDto.bidId);
        return result;
    }

    // @Post('rejoin')
    // async rejoin(@Req() req) {}
}
