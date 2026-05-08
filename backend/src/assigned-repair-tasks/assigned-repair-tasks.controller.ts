import { Body, Controller, Post } from '@nestjs/common';
import { AssignedRepairTasksService } from './assigned-repair-tasks.service';
import { CreateAssignedRepairTaskDto } from './dto/create-assigned-repair-task.dto';

@Controller('assigned-repair-tasks')
export class AssignedRepairTasksController {
  constructor(
    private readonly assignedRepairTasksService: AssignedRepairTasksService,
  ) {}

  @Post()
  createAssignedRepairTask(
    @Body() createAssignedRepairTaskDto: CreateAssignedRepairTaskDto,
  ) {
    return this.assignedRepairTasksService.createAssignedRepairTask(
      createAssignedRepairTaskDto,
    );
  }
}