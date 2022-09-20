import { Provider } from '../constants';
import { RobotEntity } from './entities/robot.entity';

export const robotsProviders = [
    {
        provide: Provider.RobotRepository,
        useValue: RobotEntity,
    },
];
