import { Module } from '@nestjs/common';
import { AssignedRepairTasksService } from './assigned-repair-tasks.service';
import { AssignedRepairTasksController } from './assigned-repair-tasks.controller';

@Module({
  controllers: [AssignedRepairTasksController],
  providers: [AssignedRepairTasksService],
})
export class AssignedRepairTasksModule {}
