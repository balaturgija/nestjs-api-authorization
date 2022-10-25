import { Inject, Injectable } from '@nestjs/common';
import { toUserDto, toUserRoleDto } from '../base/utils/Mapper.util';
import { Provider } from '../constants';
import { RoleEntity } from '../roles/entities/role.entity';
import { WalletEntity } from '../wallets/entities/wallet.entity';
import { UserCreateDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Codes } from './exceptions/codes';
import { UserCouldNotBeCreatedException } from './exceptions/user-coult-not-be-created.exception';
import { AuthenticatedUser } from './models/autheticated-user';
import bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize';
import { WalletsService } from '../wallets/wallets.service';
import { RolesService } from '../roles/roles.service';
@Injectable()
export class UsersService {
    constructor(
        @Inject(Provider.UserRepository)
        private readonly userRepository: typeof UserEntity,
        @Inject(Provider.Sequelize) private readonly sequelize: Sequelize,
        private readonly walletsService: WalletsService,
        private readonly roleService: RolesService
    ) {}

    async createAsync(dto: UserCreateDto): Promise<AuthenticatedUser> {
        const transaction = await this.sequelize.transaction();
        try {
            const wallet = await this.walletsService.createAsync(transaction);
            const role = await this.roleService.getByName(
                dto.role,
                transaction
            );
            const passwordHash = await this.hashPassword(dto.password);

            const user = await this.userRepository.create(
                {
                    username: dto.username,
                    email: dto.email,
                    password: passwordHash,
                    roleId: role.id,
                    walletId: wallet.id,
                },
                {
                    transaction,
                }
            );
            await transaction.commit();
            return new AuthenticatedUser(
                user.id,
                user.username,
                user.email,
                user.roleId,
                user.walletId
            );
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            throw new UserCouldNotBeCreatedException(
                {
                    message: 'User already exists',
                    code: Codes.AUTH_USER_EXISTS,
                },
                422
            );
        }
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async getByEmailAsync(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { email: email },
        });
    }

    async getByUsernameAsync(username: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { username: username },
        });
    }

    async getUserProfileAsync(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
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
    }
}
