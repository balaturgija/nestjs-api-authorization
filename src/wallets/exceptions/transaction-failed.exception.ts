import { HttpException } from '@nestjs/common';

export class TransactionFailedException extends HttpException {
    constructor(response: string, status?: number) {
        super(response, status);
    }
}
