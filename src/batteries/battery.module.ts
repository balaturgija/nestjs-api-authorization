import { Module } from '@nestjs/common';
import { ErrorHandler } from 'src/helpers/ErrorHandler';
import { SuccessHandler } from 'src/helpers/SuccessHandler';
import { BatteriesController } from './batteries.controller';
import { batteriesProviders } from './batteries.providers';
import { BatteriesService } from './batteries.service';

@Module({
  imports: [ErrorHandler, SuccessHandler],
  controllers: [BatteriesController],
  providers: [BatteriesService, ...batteriesProviders],
})
export class BatteriesModule {}
