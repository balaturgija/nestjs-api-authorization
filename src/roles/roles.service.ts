import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { GlobalRole, Provider } from '../constants';
import { RoleEntity } from './entities/role.entity';
import { UnallowedRoleException } from './exceptions/unallowed-role.exception';

@Injectable()
export class RolesService {
    constructor(
        @Inject(Provider.RolesRepository)
        private readonly roleRepository: typeof RoleEntity
    ) {}

    private async getByIdAsync(id: string): Promise<Role | null> {
        return (await this.roleRepository.findByPk(id)) ?? null;
    }

    async getByName(name: string, t?: Transaction): Promise<Role | null> {
        if (name === GlobalRole.Admin)
            throw new UnallowedRoleException('Role unavailable');

        return (
            (await this.roleRepository.findOne({
                where: { name: name },
                transaction: t,
            })) ?? null
        );
    }

    // async getPermissions(roleName: AllowedUserRole): Promise<Role[]> {
    //     const role = await this.getByName(roleName);
    // }
}
