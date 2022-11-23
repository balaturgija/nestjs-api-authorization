import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { WalletEntity } from './entities/wallet.entity';

@Injectable()
export class WalletsRepository {
    async create(t?: Transaction) {
        return WalletEntity.create({}, { transaction: t });
    }

    async findOne(id: string, t?: Transaction) {
        return await WalletEntity.findByPk(id, { transaction: t });
    }

    async update(id: string, amount: number, t?: Transaction) {
        return WalletEntity.update(
            { amount: amount },
            { where: { id }, transaction: t }
        );
    }
}
