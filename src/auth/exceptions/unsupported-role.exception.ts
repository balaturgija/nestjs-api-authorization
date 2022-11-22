import { HttpException } from '@nestjs/common';

export class UnsupportedRoleException extends HttpException {
    constructor() {
        super({ message: 'Unsupported role' }, 403);
    }
}
