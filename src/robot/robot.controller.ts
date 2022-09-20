import { Controller } from '@nestjs/common';
import { RobotsService } from './robot.service';

@Controller('robot')
export class RobotsController {
    constructor(private readonly robotService: RobotsService) {}
}
