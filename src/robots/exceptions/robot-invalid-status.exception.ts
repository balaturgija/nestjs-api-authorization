import { HttpException } from '@nestjs/common';

export class RobotInvalidStatusException extends HttpException {
    constructor(response: string | Record<string, any>) {
        super(response, 412);
    }
}
