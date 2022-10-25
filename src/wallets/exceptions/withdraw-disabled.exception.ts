import { HttpException } from '@nestjs/common';

export class WithdrawDisabledException extends HttpException {
    constructor(response: string, status?: number) {
        super(response, status);
    }
}
