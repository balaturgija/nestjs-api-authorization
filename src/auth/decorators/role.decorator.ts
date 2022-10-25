import { SetMetadata } from '@nestjs/common';
import { GlobalRole } from '../../constants';

export const Roles = (...roles: GlobalRole[]) => SetMetadata('roles', roles);
