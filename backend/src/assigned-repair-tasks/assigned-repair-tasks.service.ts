import { Injectable } from '@nestjs/common';
import { CreateAssignedRepairTaskDto } from './dto/create-assigned-repair-task.dto';
import { UpdateAssignedRepairTaskDto } from './dto/update-assigned-repair-task.dto';

@Injectable()
export class AssignedRepairTasksService {
  create(createAssignedRepairTaskDto: CreateAssignedRepairTaskDto) {
    return 'This action adds a new assignedRepairTask';
  }

  findAll() {
    return `This action returns all assignedRepairTasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assignedRepairTask`;
  }

  update(id: number, updateAssignedRepairTaskDto: UpdateAssignedRepairTaskDto) {
    return `This action updates a #${id} assignedRepairTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignedRepairTask`;
  }
}
