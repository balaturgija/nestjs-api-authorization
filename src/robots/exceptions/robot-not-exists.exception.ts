import { HttpException } from '@nestjs/common';

export class RobotNotExistsException extends HttpException {
    constructor(response: string | Record<string, any>) {
        super(response, 404);
    }
}
