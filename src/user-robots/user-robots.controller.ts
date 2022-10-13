import { Controller } from '@nestjs/common';
import { UserRobotsService } from './user-robots.service';

@Controller('user-robots')
export class UserRobotsController {
    /**
     *
     */
    constructor(private readonly userRobotsService: UserRobotsService) {}
}
