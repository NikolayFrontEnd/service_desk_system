import { PartialType } from '@nestjs/mapped-types';
import { CreateInitialRepairRequestDto } from './create-initial-repair-request.dto';

export class UpdateInitialRepairRequestDto extends PartialType(
  CreateInitialRepairRequestDto,
) {}
