import { HttpException } from '@nestjs/common';

export class InvalidUserWalletException extends HttpException {
    constructor(response: string, status?: number) {
        super(response, status);
    }
}
