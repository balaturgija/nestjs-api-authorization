import { Controller, Post, Body, UseGuards, Inject, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role, TableName } from '../constants';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';

@Controller('auctions')
export class AuctionsController {
    constructor(
        private readonly auctionsService: AuctionsService,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

    @Post()
    @ApiTags(TableName.Auctions)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Engineer)
    @ApiBearerAuth('access-token')
    async create(
        @Body() createAuctionDto: CreateAuctionDto,
        @Res() res: Response
    ) {
        const auction = await this.auctionsService.create(createAuctionDto);
        res.send(
            this.serializer.serialize('auctions', {
                id: auction.id,
            })
        );
    }
}
