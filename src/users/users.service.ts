import { Inject, Injectable } from '@nestjs/common';
import { Sequelize, Transaction } from 'sequelize';
import { toUserDto, toUserRoleDto } from '../base/utils/Mapper.util';
import { Provider } from '../constants';
import { RoleEntity } from '../roles/entities/role.entity';
import { WalletEntity } from '../wallets/entities/wallet.entity';
import { UserCreateDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import bcrypt from 'bcryptjs';
import { WalletsService } from '../wallets/wallets.service';
import { RegistrationFailed } from '../auth/exceptions/registration.failed.exception';
@Injectable()
export class UsersService {
    constructor(
        @Inject(Provider.UserRepository)
        private readonly userRepository: typeof UserEntity,
        @Inject(Provider.Sequelize) private readonly sequelize: Sequelize,
        private readonly walletsService: WalletsService
    ) {}

    async createAsync(user: UserCreateDto): Promise<User> {
        const transaction = await this.sequelize.transaction();
        try {
            const password = await this.createPassword(user.password);
            const wallet = await this.walletsService.createAsync(transaction);
            const userCreate = await this.userRepository.create(
                {
                    email: user.email,
                    username: user.username,
                    password: password,
                    roleId: user.roleId,
                    walletId: wallet.id,
                },
                { transaction: transaction }
            );
            await transaction.commit();
            return userCreate;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            throw new RegistrationFailed('Registration failed', 400);
        }
    }

    async getByEmailAsync(
        email: string,
        t?: Transaction
    ): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { email: email },
            transaction: t,
        });
    }

    async getByUsernameAsync(username: string): Promise<User | null> {
        const result = await this.userRepository.findOne({
            where: { username: username },
        });
        return result ? toUserDto(result) : null;
    }

    async getUserProfileAsync(email: string): Promise<User | null> {
        const result = await this.userRepository.findOne({
            where: {
                email: email,
            },
            include: [
                {
                    model: RoleEntity,
                },
                {
                    model: WalletEntity,
                },
            ],
        });

        return result ? toUserRoleDto(result) : null;
    }

    private async createPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async emailExists(email: string): Promise<boolean> {
        const result = await this.userRepository.findOne({
            where: { email },
            attributes: ['id'],
            rejectOnEmpty: false,
        });

        return Boolean(result);
    }
}
