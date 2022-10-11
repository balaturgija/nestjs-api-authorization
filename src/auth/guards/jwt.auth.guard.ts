import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Provider } from '../../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(Provider.Jwt) {}
