import { Inject, Injectable } from '@nestjs/common';
import { RequestUserProvider } from '../base/request-user.provider';
import { toUserDto, toUserRoleDto } from '../base/utils/Mapper.util';
import { Provider } from '../constants';
import { RoleEntity } from '../roles/entities/role.entity';
import { WalletEntity } from '../wallets/entities/wallet.entity';
import { UserCreateDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
@Injectable()
export class UsersService {
    constructor(
        @Inject(Provider.UserRepository)
        private readonly userRepository: typeof UserEntity
    ) {}

    async createAsync(dto: UserCreateDto): Promise<User> {
        const result = await this.userRepository.create(dto);
        return toUserDto(result);
    }

    async getByEmailAsync(email: string): Promise<User | null> {
        const result = await this.userRepository.findOne({
            where: { email: email },
        });
        return result ? toUserDto(result) : null;
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
