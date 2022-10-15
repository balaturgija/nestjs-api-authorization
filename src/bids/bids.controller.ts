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
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';

@Controller('bids')
export class BidsController {
    constructor(private readonly bidsService: BidsService) {}

    @Post()
    @ApiTags(TableName.Bids)
    create(@Body() createBidDto: CreateBidDto) {
        return this.bidsService.create(createBidDto);
    }

    @Get()
    @ApiTags(TableName.Bids)
    findAll() {
        return this.bidsService.findAll();
    }

    @Get(':id')
    @ApiTags(TableName.Bids)
    findOne(@Param('id') id: string) {
        return this.bidsService.findOne(+id);
    }

    @Patch(':id')
    @ApiTags(TableName.Bids)
    update(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
        return this.bidsService.update(+id, updateBidDto);
    }

    @Delete(':id')
    @ApiTags(TableName.Bids)
    remove(@Param('id') id: string) {
        return this.bidsService.remove(+id);
    }
}
