import { HttpException } from '@nestjs/common';

export class UserHaveNoRoleException extends HttpException {
    constructor(response: string, status?: number) {
        super(response, status);
    }
}
