import { Body, Controller, Param, ParseIntPipe, Patch, Post, Delete, UseGuards } from '@nestjs/common';
import { AssignedRepairTasksService } from './assigned-repair-tasks.service';
import { CreateAssignedRepairTaskDto } from './dto/create-assigned-repair-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('assigned-repair-tasks')
@UseGuards(JwtAuthGuard)
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