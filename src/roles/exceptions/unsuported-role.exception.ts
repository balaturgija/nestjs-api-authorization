import { HttpException } from '@nestjs/common';

export class UnsuportedRoleException extends HttpException {
    constructor() {
        super('Unsuported role', 422);
    }
}
