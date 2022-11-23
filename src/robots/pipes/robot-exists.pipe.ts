import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { RobotNotExistsException } from '../exceptions/robot-not-exists.exception';
import { RobotsService } from '../robots.service';

@Injectable()
export class RobotExistsPipe implements PipeTransform<CreateUserDto> {
    constructor(private readonly robotsService: RobotsService) {}
    async transform(value: any) {
        const exists = await this.robotsService.exists(value);

        if (!exists) {
            throw new RobotNotExistsException({
                message: `Robot with ID ${value} not found`,
            });
        }

        return value;
    }
}
