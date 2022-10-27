import { Inject, Injectable } from '@nestjs/common';
import { Sequelize, Transaction } from 'sequelize';
import { RequestUserProvider } from '../base/request-user.provider';
import { toUserDto, toUserRoleDto } from '../base/utils/Mapper.util';
import { Provider } from '../constants';
import { RoleEntity } from '../roles/entities/role.entity';
import { RolesService } from '../roles/roles.service';
import { WalletEntity } from '../wallets/entities/wallet.entity';
import { WalletsService } from '../wallets/wallets.service';
import { UserCreateDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserEmailException } from './exceptions/user-email.exception';
import bcrypt from 'bcryptjs';
import { RegistrationFailed } from './exceptions/registration-failed.exception';
@Injectable()
export class UsersService {
    constructor(
        @Inject(Provider.UserRepository)
        private readonly userRepository: typeof UserEntity,
        @Inject(Provider.Sequelize) private readonly sequelize: Sequelize,
        private readonly walletsService: WalletsService,
        private readonly rolesService: RolesService
    ) {}

    async createAsync(dto: UserCreateDto) {
        const transaction = await this.sequelize.transaction();
        try {
            const emailExists = await this.getByEmailAsync(
                dto.email,
                transaction
            );
            if (emailExists)
                throw new UserEmailException('User with email exists', 422);

            const password = await this.createPassword(dto.password);
            const wallet = await this.walletsService.createAsync(transaction);
            const role = await this.rolesService.getByName(
                dto.role,
                transaction
            );
            const userCreate = await this.userRepository.create(
                {
                    email: dto.email,
                    username: dto.username,
                    password: password,
                    roleId: role.id,
                    walletId: wallet.id,
                },
                { transaction: transaction }
            );
            await transaction.commit();
            return userCreate;
        } catch (error) {
            console.log(error);
            await transaction.rollback();
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

    private async createPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
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
}
