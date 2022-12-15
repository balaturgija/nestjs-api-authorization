import { Body, Controller, Inject, Patch } from '@nestjs/common';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Roles } from '../auth/decorators/role.decorator';
import { WalletAuthChallenge } from '../auth/decorators/wallet-auth-challenge';
import { Role } from '../constants';
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
    @WalletAuthChallenge()
    @Roles(Role.Collector, Role.Engineer)
    async deposit(
        @AuthUser() user: User,
        @Body() patchWalletDto: WalletPatchDto
    ) {
        const wallet = await this.walletsService.moneyTransaction(
            user.wallet.id,
            patchWalletDto.amount,
            'Deposit'
        );

        return this.serializer.serialize('wallets', wallet.toJSON());
    }

    @Patch('/withdraw')
    @WalletAuthChallenge()
    @Roles(Role.Collector, Role.Engineer)
    async withdraw(
        @AuthUser() user: User,
        @Body() patchWalletDto: WalletPatchDto
    ) {
        const wallet = await this.walletsService.moneyTransaction(
            user.wallet.id,
            patchWalletDto.amount,
            'Withdraw'
        );

        return this.serializer.serialize('wallets', wallet.toJSON());
    }
}
