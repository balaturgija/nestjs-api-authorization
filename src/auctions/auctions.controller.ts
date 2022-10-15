import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TableName } from '../constants';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';

@Controller('auctions')
export class AuctionsController {
    constructor(private readonly auctionsService: AuctionsService) {}

    @Post()
    @ApiTags(TableName.Auctions)
    create(@Body() createAuctionDto: CreateAuctionDto) {
        return this.auctionsService.create(createAuctionDto);
    }

    @Get()
    @ApiTags(TableName.Auctions)
    findAll() {
        return this.auctionsService.findAll();
    }

    @Get(':id')
    @ApiTags(TableName.Auctions)
    findOne(@Param('id') id: string) {
        return this.auctionsService.findOne(+id);
    }

    @Patch(':id')
    @ApiTags(TableName.Auctions)
    update(
        @Param('id') id: string,
        @Body() updateAuctionDto: UpdateAuctionDto
    ) {
        return this.auctionsService.update(+id, updateAuctionDto);
    }

    @Delete(':id')
    @ApiTags(TableName.Auctions)
    remove(@Param('id') id: string) {
        return this.auctionsService.remove(+id);
    }
}
