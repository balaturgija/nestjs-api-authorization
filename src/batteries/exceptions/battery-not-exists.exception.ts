import { HttpException } from '@nestjs/common';

export class BatteryNotExistsException extends HttpException {
    constructor(response: string | Record<string, any>) {
        super(response, 404);
    }
}
