import { Provider } from '../constants';
import { UserEntity } from './entities/user.entity';

export const usersProviders = [
    {
        provide: Provider.UserRepository,
        useValue: UserEntity,
    },
];
