import {
    Controller,
    Post,
    Body,
    Inject,
    HttpCode,
    Res,
    Param,
    Get,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { AuthUser } from '../../auth/decorators/auth-user.decorator';
import { Roles } from '../../auth/decorators/role.decorator';
import { Role } from '../../constants';
import { AuctionsService } from '../services/auctions.service';
import { CreateAuctionDto } from '../dto/create-auction.dto';
import { Response } from 'express';
import { RobotExistsPipe } from '../../robots/pipes/robot-exists.pipe';
import { AuctionExistsPipe } from '../pipes/auction-exist.pipe';
import { AuctionTokensServices } from '../services/auction-tokens.service';
import { RobotAuctionStatusPipe } from '../../robots/pipes/robot-auction.pipe';
import { Pagination } from '../../base/decorators/pagination.decorator';
import { AuctionAuthChallenge } from '../../auth/decorators/auction-auth-challenge.decorator';

@Controller('auctions')
export class AuctionsController {
    constructor(
        private readonly auctionsService: AuctionsService,
        private readonly authService: AuthService,
        private readonly auctionTokensService: AuctionTokensServices,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

    @Get()
    @HttpCode(200)
    @AuctionAuthChallenge()
    @Roles(Role.Engineer, Role.Collector)
    @Pagination()
    async get(
        @Query('page', ParseIntPipe) page = 1,
        @Query('size', ParseIntPipe) size = 10,
        @Query('direction') direction
    ) {
        const paginationItems = await this.auctionsService.paginate(
            page,
            size,
            direction
        );
        return this.serializer.serialize(
            'batteriesPagination',
            paginationItems
        );
    }

    @Post(':robotId')
    @HttpCode(201)
    @AuctionAuthChallenge()
    @Roles(Role.Engineer)
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
    @HttpCode(201)
    @AuctionAuthChallenge()
    @Roles(Role.Collector)
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
    @HttpCode(201)
    @AuctionAuthChallenge()
    @Roles(Role.Collector, Role.Engineer)
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
