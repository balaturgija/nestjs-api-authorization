import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SampleGuard implements CanActivate {
    constructor(private readonly name: string) {}

    canActivate(context: ExecutionContext): boolean {
        console.log(`Executing guard "${this.name}"`);
        return true;
    }
}
