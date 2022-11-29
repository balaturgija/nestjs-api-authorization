import { WsException } from '@nestjs/websockets';

export class ActionSomethingWsException extends WsException {
    constructor(error: object) {
        super(error);
    }
}
