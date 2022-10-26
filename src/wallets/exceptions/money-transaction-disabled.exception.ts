import { HttpException } from '@nestjs/common';

export class MoneyTransactionDisabledException extends HttpException {
    constructor(response: string, status?: number) {
        super(response, status);
    }
}
