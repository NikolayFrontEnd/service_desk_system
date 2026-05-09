import { Module } from '@nestjs/common';
import { AssignedRepairTasksService } from './assigned-repair-tasks.service';
import { AssignedRepairTasksController } from './assigned-repair-tasks.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AssignedRepairTasksController],
  providers: [AssignedRepairTasksService],
})
export class AssignedRepairTasksModule {}
