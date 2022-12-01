import { HttpException } from '@nestjs/common';

export class UserAlreadyJoined extends HttpException {
    constructor() {
        super(
            { message: 'User already joined on this auction, please rejoin.' },
            400
        );
    }
}
