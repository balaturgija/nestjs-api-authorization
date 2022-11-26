import { HttpException } from '@nestjs/common';

export class AuctionAlreadyExistsException extends HttpException {
    constructor(response: string | Record<string, any>) {
        super(response, 403);
    }
}
