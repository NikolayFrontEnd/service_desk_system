import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignedRepairTaskDto } from './create-assigned-repair-task.dto';

export class UpdateAssignedRepairTaskDto extends PartialType(
  CreateAssignedRepairTaskDto,
) {}
