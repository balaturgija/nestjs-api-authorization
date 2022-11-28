import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TableName } from '../../constants';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { RoleGuard } from '../guards/role.guard';

export function AuctionAuthChallenge() {
    return applyDecorators(
        ApiTags(TableName.Auctions),
        UseGuards(JwtAuthGuard, RoleGuard),
        ApiBearerAuth('access-token')
    );
}
