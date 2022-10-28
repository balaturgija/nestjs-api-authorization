import { HttpException } from '@nestjs/common';

export class RegistrationFailed extends HttpException {
    constructor(response: string, status?: number) {
        super(response, status);
    }
}
