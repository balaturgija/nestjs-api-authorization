import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SampleGuard implements CanActivate {
    constructor(private readonly name: string) {}

    canActivate(context: ExecutionContext): boolean {
        console.log('\x1b[32m Executing guard \x1b[0m', `"${this.name}"`);
        return true;
    }
}
