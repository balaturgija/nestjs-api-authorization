import { Inject, Injectable } from '@nestjs/common';
import { Provider } from '../constants';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RolesService {
    constructor(
        @Inject(Provider.RolesRepository)
        private readonly roleRepository: typeof RoleEntity
    ) {}

    async getByIdAsync(id: string): Promise<Role | null> {
        return (await this.roleRepository.findByPk(id)) ?? null;
    }
}
