import { Body, Controller, Post } from '@nestjs/common';
import { InitialRepairRequestsService } from './initial-repair-requests.service';
import { CreateInitialRepairRequestDto } from './dto/create-initial-repair-request.dto';

@Controller('initial-repair-requests')
export class InitialRepairRequestsController {
  constructor(
    private readonly initialRepairRequestsService: InitialRepairRequestsService,
  ) {}

  @Post()
  createInitialRepairRequest(
    @Body() createInitialRepairRequestDto: CreateInitialRepairRequestDto,
  ) {
    return this.initialRepairRequestsService.createInitialRepairRequest(
      createInitialRepairRequestDto,
    );
  }
}
