import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Provider, Role } from '../constants';
import { RoleEntity } from './entities/role.entity';
import { UnsuportedRoleException } from './exceptions/unsuported-role.exception';

@Injectable()
export class RolesService {
    constructor(
        @Inject(Provider.RolesRepository)
        private readonly roleRepository: typeof RoleEntity
    ) {}

    async getByName(name: string, t?: Transaction) {
        if (name === Role.Admin) {
            throw new UnsuportedRoleException();
        } else {
            return await this.roleRepository.findOne({
                where: { name: name },
                transaction: t,
            });
        }
    }

    async getByIdAsync(id: string) {
        return (await this.roleRepository.findByPk(id)) ?? null;
    }
}
