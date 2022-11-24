import {
    Controller,
    Post,
    Body,
    UseGuards,
    Inject,
    HttpCode,
    Res,
    Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role, TableName } from '../constants';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { Response } from 'express';
import { RobotExistsPipe } from '../robots/pipes/robot-exists.pipe';
import { AuctionExistsPipe } from './pipes/auction-exist.pipe';

@Controller('auctions')
export class AuctionsController {
    constructor(
        private readonly auctionsService: AuctionsService,
        private readonly authService: AuthService,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

    @Post(':robotId')
    @ApiTags(TableName.Auctions)
    @HttpCode(201)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Engineer)
    @ApiBearerAuth('access-token')
    async create(
        @Res() res: Response,
        @AuthUser() user,
        @Param('robotId', RobotExistsPipe) robotId: string,
        @Body() createAuctionDto: CreateAuctionDto
    ) {
        const auction = await this.auctionsService.create(
            robotId,
            createAuctionDto.startAmount
        );
        const auctionToken = await this.authService.createToken({
            user: user,
            auctionId: auction.id,
        });
        res.header('auction-token', auctionToken);
        res.send(
            this.serializer.serialize('auctions', {
                id: auction.id,
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
        res.send(
            this.serializer.serialize('auctions', {
                id: auction.id,
            })
        );
    }
}
