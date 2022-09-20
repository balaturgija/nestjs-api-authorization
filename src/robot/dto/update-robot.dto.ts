import { PartialType } from '@nestjs/swagger';
import { RobotCreateDto } from './create-robot.dto';

export class RobotUpdateDto extends PartialType(RobotCreateDto) {}
