import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { BaseService } from '../base/base.service';
import { getPropertyName } from '../base/utils/GetPropertyName';
import { toUserDto, toUserRoleDto } from '../base/utils/Mapper';
import { Provider } from '../constants';
import { RoleEntity } from '../roles/entities/role.entity';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
@Injectable()
export class UsersService extends BaseService<UserEntity> {
    constructor(
        @Inject(Provider.UserRepository)
        private readonly userRepository: Repository<UserEntity>
    ) {
        super(userRepository);
    }

    async getByEmailAsync(email: string): Promise<User | null> {
        return this.getByAsync({ email: email });
    }

    async getByUsernameAsync(username: string): Promise<User | null> {
        const result = await this.getByAsync({
            [getPropertyName<UserDto>().username]: username,
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
            ],
        });

        return result ? toUserRoleDto(result) : null;
    }
}
