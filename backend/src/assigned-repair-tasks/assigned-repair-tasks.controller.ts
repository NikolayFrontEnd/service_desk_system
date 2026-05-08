import { Body, Controller, Param, ParseIntPipe, Patch, Post, Delete } from '@nestjs/common';
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

  @Patch(':id/start')
  startRepairTask(@Param('id', ParseIntPipe) id: number) {
    return this.assignedRepairTasksService.startRepairTask(id);
  }
    @Delete(':id')
  finishRepairTask(@Param('id', ParseIntPipe) id: number) {
    return this.assignedRepairTasksService.finishRepairTask(id);
  }
}