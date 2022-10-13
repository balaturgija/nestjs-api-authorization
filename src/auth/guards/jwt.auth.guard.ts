import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Provider } from '../../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(Provider.Jwt) {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        // const request = context.switchToHttp().getRequest();
        // const token: string = request.headers.authorization;
        // if (!token) throw new Error('Access denied, Authorization missing');
        // if (!token.startsWith('Bearer')) throw new Error('Wrong token format.');
        return super.canActivate(context);
    }

    handleRequest<TUser = User>(
        err: any,
        user: any,
        info: any,
        context: ExecutionContext,
        status?: any
    ): TUser {
        console.log('\x1b[32m Executing Jwt Auth Guard \x1b[0m');
        if (err || !user) throw new err() || new UnauthorizedException();

        return user;
    }
}
