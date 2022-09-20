import { Provider } from '../constants';
import { RoleEntity } from './entities/role.entity';

export const rolesProviders = [
    {
        provide: Provider.RolesRepository,
        useValue: RoleEntity,
    },
];
