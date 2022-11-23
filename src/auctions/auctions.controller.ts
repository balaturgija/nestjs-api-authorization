import {
    Controller,
    Post,
    Body,
    UseGuards,
    Inject,
    HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role, TableName } from '../constants';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { JoinAuctionDto } from './dto/join-auction.dto';

@Controller('auctions')
export class AuctionsController {
    constructor(
        private readonly auctionsService: AuctionsService,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

    @Post()
    @ApiTags(TableName.Auctions)
    @HttpCode(201)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Engineer)
    @ApiBearerAuth('access-token')
    async create(@Body() createAuctionDto: CreateAuctionDto) {
        const auction = await this.auctionsService.create(
            createAuctionDto.robotId
        );
        return this.serializer.serialize('auctions', {
            id: auction.id,
        });
    }

    @Post('/join')
    async join(@Body() joinAuctionDto: JoinAuctionDto) {}
}
