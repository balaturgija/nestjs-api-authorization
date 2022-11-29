import { HttpException } from '@nestjs/common';

export class HttpValidationException extends HttpException {
    constructor(response: string | Record<string, any>) {
        super(response, 422);
    }
}
