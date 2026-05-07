import { Module } from '@nestjs/common';
import { InitialRepairRequestsService } from './initial-repair-requests.service';
import { InitialRepairRequestsController } from './initial-repair-requests.controller';

@Module({
  controllers: [InitialRepairRequestsController],
  providers: [InitialRepairRequestsService],
})
export class InitialRepairRequestsModule {}
