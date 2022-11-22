import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
    constructor(private readonly rolesRepository: RolesRepository) {}

    async findRoleByName(role: string, t?: Transaction) {
        const result = await this.rolesRepository.findRoleByName(role, t);
        return result.id;
    }
}
