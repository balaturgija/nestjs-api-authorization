import { Injectable, PipeTransform } from '@nestjs/common';
import { RobotStatus } from '../../constants';
import { RobotInvalidStatusException } from '../exceptions/robot-invalid-status.exception';
import { RobotsService } from '../robots.service';

@Injectable()
export class RobotAuctionStatusPipe implements PipeTransform {
    constructor(private readonly robotsService: RobotsService) {}

    async transform(value: any) {
        const status = await this.robotsService.checkStatus(value);

        if (status != RobotStatus.Created) {
            throw new RobotInvalidStatusException({
                message: `Robot with ${value} incompatible for this action.`,
            });
        }

        return value;
    }
}
