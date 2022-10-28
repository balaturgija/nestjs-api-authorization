import { Body, Controller, Param, Patch, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { MoneyAction, TableName } from '../constants';
import { WalletParamsDto } from './dto/params.wallet.dto';
import { WalletPatchDto } from './dto/patch-wallet.dto';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
    /**
     *
     */
    constructor(private readonly walletsService: WalletsService) {}

    @Patch(':id/deposit')
    @ApiTags(TableName.Wallets)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    async deposit(
        @AuthUser() user: User,
        @Res() res: Response,
        @Param() walletParams: WalletParamsDto,
        @Body() patchWalletDto: WalletPatchDto
    ): Promise<Response> {
        const result = await this.walletsService.moneyTransactionAsync(
            user.wallet,
            walletParams.id,
            patchWalletDto,
            MoneyAction.Deposit
        );

        if (result)
            return res.status(201).send({
                message: `You have increased your wallet for ${patchWalletDto.amount}`,
            });

        return res.status(409).send({ message: 'Deposit failed.' });
    }

    @Patch(':id/withdraw')
    @ApiTags(TableName.Wallets)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    async withdraw(
        @AuthUser() user: User,
        @Res() res: Response,
        @Param() walletParams: WalletParamsDto,
        @Body() patchWalletDto: WalletPatchDto
    ): Promise<Response> {
        const result = await this.walletsService.moneyTransactionAsync(
            user.wallet,
            walletParams.id,
            patchWalletDto,
            MoneyAction.Withdraw
        );

        if (result)
            return res.status(201).send({
                message: `You have decrease your wallet for ${patchWalletDto.amount}`,
            });

        return res.status(409).send({ message: 'Withdraw failed.' });
    }
}
