import { HttpException } from '@nestjs/common';

export class MoneyRobotSwapException extends HttpException {
    constructor() {
        super({ message: 'Auction close conflict.' }, 409);
    }
}
