import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../constants';
import { UserHaveNoPermissionsExcepton } from '../exceptions/user-have-no-permission.exception';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    matchRoles(roles: Role[], userRole: string): boolean {
        return roles.some((role) => role === userRole);
    }

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        if (!roles) return true;

        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        const result = this.matchRoles(roles, user.role.name);

        if (!result) throw new UserHaveNoPermissionsExcepton();

        return result;
    }
}
