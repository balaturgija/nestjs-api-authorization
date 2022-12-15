import { HttpException } from '@nestjs/common';

export class UnacceptableBidException extends HttpException {
    constructor() {
        super({ message: 'Your offer price is not accepted' }, 400);
    }
}
