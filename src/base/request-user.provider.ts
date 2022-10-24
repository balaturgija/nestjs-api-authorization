import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class RequestUserProvider {
    get user(): User {
        return this.req.user;
    }

    constructor(@Inject(REQUEST) private readonly req) {}
}
