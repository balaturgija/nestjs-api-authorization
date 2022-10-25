import { Inject, Injectable } from '@nestjs/common';
import { Sequelize, Transaction } from 'sequelize';
import { UserHaveNoWalletException } from '../base/exceptions/user-have-no-wallet.exception';
import { RequestUserProvider } from '../base/request-user.provider';
import { toWalletDto } from '../base/utils/Mapper.util';
import { MoneyAction, Provider } from '../constants';
import { WalletEntity } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
    private get user(): User {
        return this.requestUserProvider.user;
    }

    constructor(
        @Inject(Provider.WalletRepository)
        private readonly walletRepository: typeof WalletEntity,
        @Inject(Provider.Sequelize) private readonly sequelize: Sequelize,
        private readonly requestUserProvider: RequestUserProvider
    ) {}

    async findByIdAsync(id: string, t?: Transaction): Promise<Wallet | null> {
        const result = await this.walletRepository.findByPk(id, {
            transaction: t,
        });
        return result ? toWalletDto(result) : null;
    }

    async createAsync(t?: Transaction): Promise<Wallet> {
        return await this.walletRepository.create(t);
    }

    async moneyTransactionAsync(
        walletId: string,
        patchWalletDto,
        action: MoneyAction
    ): Promise<boolean> {
        if (this.user.walletId !== walletId)
            throw new UserHaveNoWalletException(
                'User does not link with Wallet'
            );

        const transaction = await this.sequelize.transaction();
        try {
            const wallet = await this.findByIdAsync(walletId, transaction);
            // if (wallet.amount < patchWalletDto.amount)
            //     throw new WithdrawDisabledException(
            //         {
            //             message: 'You cant withdraw this amount',
            //             code: Codes.WITHDRAW_DISABLED,
            //         },
            //         500
            //     );

            await this.patchWaletAmount(
                wallet,
                patchWalletDto.amount,
                action,
                transaction
            );

            await transaction.commit();
            return true;
        } catch (error) {
            await transaction.rollback();
            return false;
        }
    }

    private async patchWaletAmount(
        wallet: Wallet,
        amount: number,
        action: MoneyAction,
        t?: Transaction
    ): Promise<boolean> {
        if (action === MoneyAction.Deposit) {
            wallet.amount += Number(amount);
        }

        if (action === MoneyAction.Withdraw) {
            wallet.amount -= Number(action);
        }

        return await this.updateAmount(wallet.id, amount, t);
    }

    private async updateAmount(
        id: string,
        amount: number,
        t?: Transaction
    ): Promise<boolean> {
        return (
            (await this.walletRepository.update(
                { amount: amount },
                { where: { id: id }, transaction: t }
            )[0]) > 0
        );
    }
}
