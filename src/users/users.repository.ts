import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { RoleEntity } from '../roles/entities/role.entity';
import { WalletEntity } from '../wallets/entities/wallet.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersRepository {
    async findByEmail(email: string) {
        return await UserEntity.findOne({
            where: { email: email },
            include: [{ model: RoleEntity }, { model: WalletEntity }],
        });
    }

    async create(
        email: string,
        username: string,
        password: string,
        roleId: string,
        walletId: string,
        t?: Transaction
    ) {
        return UserEntity.create(
            {
                email,
                username,
                password,
                roleId,
                walletId,
            },
            { transaction: t }
        );
    }
}
