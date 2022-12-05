import { HttpException } from '@nestjs/common';

export class WalletBalanceException extends HttpException {
    constructor() {
        super({ message: 'Not enough money in your wallet.' }, 400);
    }
}
