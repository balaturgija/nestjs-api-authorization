import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../constants';
import { UserHaveNoPermissions } from '../exceptions/user-have-no-permission.exception';

@Injectable()
export class RoleGuard implements CanActivate {
    /**
     *
     */
    constructor(private reflector: Reflector) {}

    matchRoles(roles: Role[], userRole: string): boolean {
        console.log('\x1b[32m Executing Role Guard \x1b[0m');

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

        if (!result) throw new UserHaveNoPermissions();

        return result;
    }
}
