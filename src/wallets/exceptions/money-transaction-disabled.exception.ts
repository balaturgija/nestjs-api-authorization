import { HttpException } from '@nestjs/common';

export class MoneyTransactionDisabledException extends HttpException {
    constructor(response: string | Record<string, any>) {
        super(response, 405);
    }
}
