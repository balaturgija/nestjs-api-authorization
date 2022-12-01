import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator((_, ctx: ExecutionContext) => {
    const type = ctx.getType();
    if (ctx.getType() === 'http') {
        const request = ctx.switchToHttp().getRequest();
        request.user.wallet.amount = Number(request.user.wallet.amount);
        return request.user;
    }

    if (ctx.getType() === 'ws') {
        const clinet = ctx.switchToWs().getClient();
        clinet.user.wallet.amount = Number(clinet.user.wallet.amount);
        return clinet.user;
    }
});
