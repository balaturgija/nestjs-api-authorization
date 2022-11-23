import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../constants';
import { UnsupportedRoleException } from '../exceptions/unsupported-role.exception';

@Injectable()
export class RegistrationGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    matchRoles(roles: Role[], inputRole: string): boolean {
        return roles.some((role) => role === inputRole);
    }

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) return true;

        const request = context.switchToHttp().getRequest();
        const role = request.body.role;
        const match = this.matchRoles(roles, role);

        if (!match) throw new UnsupportedRoleException();

        return match;
    }
}
