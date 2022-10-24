import { HttpException } from '@nestjs/common';

export class UserHaveNoWalletException extends HttpException {
    constructor(response: string, status?: number) {
        super(response, status);
    }
}
