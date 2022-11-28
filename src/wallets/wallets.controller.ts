import { Body, Controller, Inject, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { TableName } from '../constants';
import { WalletPatchDto } from './dto/patch-wallet.dto';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
    /**
     *
     */
    constructor(
        private readonly walletsService: WalletsService,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

    @Patch('/deposit')
    @ApiTags(TableName.Wallets)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    async deposit(
        @AuthUser() user: User,
        @Body() patchWalletDto: WalletPatchDto
    ) {
        const wallet = await this.walletsService.moneyTransaction(
            user.wallet,
            patchWalletDto,
            'Deposit'
        );

        return this.serializer.serialize('wallets', wallet.toJSON());
    }

    @Patch('/withdraw')
    @ApiTags(TableName.Wallets)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    async withdraw(
        @AuthUser() user: User,
        @Body() patchWalletDto: WalletPatchDto
    ) {
        const wallet = await this.walletsService.moneyTransaction(
            user.wallet,
            patchWalletDto,
            'Withdraw'
        );

        return this.serializer.serialize('wallets', wallet.toJSON());
    }
}
