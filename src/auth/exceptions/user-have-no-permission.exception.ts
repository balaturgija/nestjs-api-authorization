import { HttpException } from '@nestjs/common';

export class UserHaveNoPermissionsExcepton extends HttpException {
    constructor() {
        super({ message: 'You have no permissions for this action' }, 403);
    }
}
