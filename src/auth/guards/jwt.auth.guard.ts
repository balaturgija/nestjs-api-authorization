import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Provider } from '../../constants';
import { IS_PUBLIC_KEY } from '../decorators/publicRoute.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard(Provider.Jwt) {
    /**
     *
     */
    constructor(private reflector: Reflector) {
        super();
    }
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        );
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }

    // handleRequest<TUser = any>(
    //     err: any,
    //     user: any,
    //     info: any,
    //     context: ExecutionContext,
    //     status?: any
    // ): TUser {
    //     console.log('\x1b[32m Executing Jwt Auth Guard \x1b[0m');
    //     if (!user) throw new err() || new UnauthorizedException();

    //     return user;
    // }
}
