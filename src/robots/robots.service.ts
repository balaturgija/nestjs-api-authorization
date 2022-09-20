import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { BaseService } from '../base/base.service';
import { Provider } from '../constants';
import { RobotEntity } from './entities/robot.entity';

@Injectable()
export class RobotsService extends BaseService<RobotEntity> {
    constructor(
        @Inject(Provider.RobotRepository)
        private readonly robotRepository: Repository<RobotEntity>
    ) {
        super(robotRepository);
    }
}
