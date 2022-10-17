import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { validateBody } from '../base/middlewares/ValidateBody.middleware';
import { TableName } from '../constants';
import { BatteriesController } from './batteries.controller';
import { batteriesProviders } from './batteries.providers';
import { BatteriesService } from './batteries.service';
import { BatteryCreateDto } from './dto/create-battery.dto';

@Module({
    imports: [],
    controllers: [BatteriesController],
    providers: [JwtAuthGuard, BatteriesService, ...batteriesProviders],
    exports: [BatteriesService],
})
export class BatteriesModule {
    configure(consumer: MiddlewareConsumer) {
        const baseRoute = TableName.Batteries;
        // validate body middleware
        consumer
            .apply(validateBody(BatteryCreateDto))
            .forRoutes({ path: baseRoute, method: RequestMethod.POST });
    }
}
