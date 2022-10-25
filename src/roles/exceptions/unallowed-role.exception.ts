import { HttpException } from '@nestjs/common';

export class UnallowedRoleException extends HttpException {
    constructor(response: string, status?: number) {
        super(response, status);
    }
}
