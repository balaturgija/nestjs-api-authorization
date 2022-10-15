import { PageResult } from '../../base/utils/PageResult';
import { RobotCreateDto } from '../dto/create-robot.dto';
import { RobotFilterDto } from '../dto/filter-robot.dto';
import { RobotUpdateDto } from '../dto/update-robot.dto';

export interface RobotService {
    findAllAsync: (query: RobotFilterDto) => Promise<PageResult<Robot>>;
    getByIdAsync: (id: string) => Promise<Robot | null>;
    createAsync: (createBatteryDto: RobotCreateDto) => Promise<Robot>;
    putAsync: (
        id: string,
        batteryUpdateDto: RobotUpdateDto
    ) => Promise<boolean>;
    deleteAsync: (id: string) => Promise<boolean>;
}
