import { Module } from '@nestjs/common';
import { InitialRepairRequestsService } from './initial-repair-requests.service';
import { InitialRepairRequestsController } from './initial-repair-requests.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [InitialRepairRequestsController],
  providers: [InitialRepairRequestsService],
})
export class InitialRepairRequestsModule {}
