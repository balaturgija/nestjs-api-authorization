import { Provider } from '../constants';
import { UserRobotsEntity } from './entities/user-robots.entity';

export const userRobotsProviders = [
    {
        provide: Provider.UserRobotsRepository,
        useValue: UserRobotsEntity,
    },
];
