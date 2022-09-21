import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { BaseService } from '../base/base.service';
import { Provider } from '../constants';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RolesService extends BaseService<RoleEntity> {
    constructor(
        @Inject(Provider.RolesRepository)
        private readonly roleRepository: Repository<RoleEntity>
    ) {
        super(roleRepository);
    }
}
