import { HttpException } from '@nestjs/common';

export class UserHaveNoPermissions extends HttpException {
    constructor() {
        super({ message: 'You have no permissions for this action' }, 403);
    }
}
