import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PipelinesGateway } from './pipelines.gateway';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, PipelinesGateway]
})
export class DashboardModule {}
