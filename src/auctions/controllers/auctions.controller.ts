import {
    Controller,
    Post,
    Body,
    UseGuards,
    Inject,
    HttpCode,
    Res,
    Param,
    Get,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../auth/auth.service';
import { AuthUser } from '../../auth/decorators/auth-user.decorator';
import { Roles } from '../../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role, SortDirection, TableName } from '../../constants';
import { AuctionsService } from '../services/auctions.service';
import { CreateAuctionDto } from '../dto/create-auction.dto';
import { Response } from 'express';
import { RobotExistsPipe } from '../../robots/pipes/robot-exists.pipe';
import { AuctionExistsPipe } from '../pipes/auction-exist.pipe';
import { AuctionTokensServices } from '../services/auction-tokens.service';
import { RobotAuctionStatusPipe } from '../../robots/pipes/robot-auction.pipe';

@Controller('auctions')
export class AuctionsController {
    constructor(
        private readonly auctionsService: AuctionsService,
        private readonly authService: AuthService,
        private readonly auctionTokensService: AuctionTokensServices,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

    @Get()
    @ApiTags(TableName.Auctions)
    @HttpCode(200)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Engineer, Role.Collector)
    @ApiBearerAuth('access-token')
    @ApiQuery({
        name: 'page',
        type: 'number',
        required: false,
        description: 'Default 1',
    })
    @ApiQuery({
        name: 'size',
        type: 'number',
        required: false,
        description: 'Default 10',
    })
    @ApiQuery({
        name: 'sortDirection',
        type: 'string',
        enum: SortDirection,
        required: false,
    })
    async get(
        @Query('page', ParseIntPipe) page = 1,
        @Query('size', ParseIntPipe) size = 10,
        @Query('sortDirection') sortDirection = SortDirection.Desc
    ) {
        const paginationItems = await this.auctionsService.findAll(
            page,
            size,
            sortDirection
        );
        return this.serializer.serialize(
            'batteriesPagination',
            paginationItems
        );
    }

    @Post(':robotId')
    @ApiTags(TableName.Auctions)
    @HttpCode(201)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Engineer)
    @ApiBearerAuth('access-token')
    async create(
        @Res() res: Response,
        @AuthUser() user,
        @Param(
            'robotId',
            RobotExistsPipe,
            RobotAuctionStatusPipe,
            AuctionExistsPipe
        )
        robotId: string,
        @Body() createAuctionDto: CreateAuctionDto
    ) {
        const auction = await this.auctionsService.create(
            robotId,
            createAuctionDto.startAmount
        );
        const token = await this.authService.createToken({
            user: user,
            auctionId: auction.id,
        });
        const auctionToken = await this.auctionTokensService.create(
            token,
            user.id,
            auction.id
        );
        res.header('auction-token', token);
        res.send(
            this.serializer.serialize('auctions', {
                id: auctionToken.id,
            })
        );
    }

    @Post('/join/:id')
    @ApiTags(TableName.Auctions)
    @HttpCode(201)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Collector)
    @ApiBearerAuth('access-token')
    async join(
        @Res() res: Response,
        @AuthUser() user,
        @Param('id', AuctionExistsPipe) id: string
    ) {
        const auction = await this.auctionsService.getById(id);
        const auctionToken = await this.authService.createToken({
            user: user,
            auctionId: auction.id,
        });
        res.header('auction-token', auctionToken);
    }

    @Post('/rejoin/:id')
    @ApiTags(TableName.Auctions)
    @HttpCode(201)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Collector, Role.Engineer)
    @ApiBearerAuth('access-token')
    async rejoin(
        @Res() res: Response,
        @AuthUser() user,
        @Param('id', AuctionExistsPipe) id: string
    ) {
        const auctionToken = await this.auctionTokensService.getExistingToken(
            user.id,
            id
        );

        res.header('auction-token', auctionToken);
    }
}
