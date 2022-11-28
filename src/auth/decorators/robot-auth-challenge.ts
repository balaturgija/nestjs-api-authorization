import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TableName } from '../../constants';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { RoleGuard } from '../guards/role.guard';

export function RobotAuthChallenge() {
    return applyDecorators(
        ApiTags(TableName.Batteries),
        UseGuards(JwtAuthGuard, RoleGuard),
        ApiBearerAuth('access-token')
    );
}
