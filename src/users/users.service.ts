import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { BaseService } from '../base/base.service';
import { Provider } from '../constants';
import { getPropertyName } from '../helpers/GetPropertyName';
import { RoleEntity } from '../roles/entities/role.entity';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { User } from './interfaces/user.interface';

export type TUser = any;
@Injectable()
export class UsersService extends BaseService<UserEntity> {
    constructor(
        @Inject(Provider.UserRepository)
        private readonly userRepository: Repository<UserEntity>
    ) {
        super(userRepository);
    }

    private readonly users: TUser[] = [
        {
            userId: 1,
            username: 'john',
            password: 'jj',
        },
    ];

    async find(username: string): Promise<TUser | undefined> {
        return this.users.find((user) => user.username === username);
    }

    async getByEmailAsync(email: string): Promise<User | null> {
        return this.getByAsync({ [getPropertyName<UserDto>().email]: email });
    }

    async getByUsernameAsync(username: string): Promise<User | null> {
        return await this.getByAsync({
            [getPropertyName<UserDto>().username]: username,
        });
    }

    async getUserProfileAsync(id: string): Promise<User | null> {
        return await this.userRepository.findByPk(id, {
            include: [
                {
                    model: RoleEntity,
                },
            ],
        });
    }
}
