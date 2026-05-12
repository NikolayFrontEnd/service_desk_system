import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { InitialRepairRequestsService } from './initial-repair-requests.service';
import { CreateInitialRepairRequestDto } from './dto/create-initial-repair-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('initial-repair-requests')
@UseGuards(JwtAuthGuard)
export class InitialRepairRequestsController {
  constructor(
    private readonly initialRepairRequestsService: InitialRepairRequestsService,
  ) {}

  @Post()
  createInitialRepairRequest(
    @Body() createInitialRepairRequestDto: CreateInitialRepairRequestDto,
    @Req() request: any,
  ) {
    const userId = request.user.sub;

    return this.initialRepairRequestsService.createInitialRepairRequest(
      createInitialRepairRequestDto,
      userId,
    );
  }

  @Get()
  getInitialRepairRequests() {
    return this.initialRepairRequestsService.getInitialRepairRequests();
  }
}