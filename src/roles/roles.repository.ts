import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RolesRepository {
    async findRoleByName(role: string, t?: Transaction) {
        return await RoleEntity.findOne({
            where: {
                name: role,
            },
            attributes: ['id'],
            transaction: t,
        });
    }
}
