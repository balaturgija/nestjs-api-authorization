import { HttpException } from '@nestjs/common';

export class UserEmailException extends HttpException {
    constructor(response: string, status?: number) {
        super(response, status);
    }
}
