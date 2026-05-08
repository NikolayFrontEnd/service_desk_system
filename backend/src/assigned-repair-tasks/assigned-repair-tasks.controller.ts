import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignedRepairTasksService } from './assigned-repair-tasks.service';
import { CreateAssignedRepairTaskDto } from './dto/create-assigned-repair-task.dto';
import { UpdateAssignedRepairTaskDto } from './dto/update-assigned-repair-task.dto';

@Controller('assigned-repair-tasks')
export class AssignedRepairTasksController {
  constructor(private readonly assignedRepairTasksService: AssignedRepairTasksService) {}

  @Post()
  create(@Body() createAssignedRepairTaskDto: CreateAssignedRepairTaskDto) {
    return this.assignedRepairTasksService.create(createAssignedRepairTaskDto);
  }

  @Get()
  findAll() {
    return this.assignedRepairTasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignedRepairTasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignedRepairTaskDto: UpdateAssignedRepairTaskDto) {
    return this.assignedRepairTasksService.update(+id, updateAssignedRepairTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignedRepairTasksService.remove(+id);
  }
}
