import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InitialRepairRequestsService } from './initial-repair-requests.service';
import { CreateInitialRepairRequestDto } from './dto/create-initial-repair-request.dto';
import { UpdateInitialRepairRequestDto } from './dto/update-initial-repair-request.dto';

@Controller('initial-repair-requests')
export class InitialRepairRequestsController {
  constructor(private readonly initialRepairRequestsService: InitialRepairRequestsService) {}

  @Post()
  create(@Body() createInitialRepairRequestDto: CreateInitialRepairRequestDto) {
    return this.initialRepairRequestsService.create(createInitialRepairRequestDto);
  }

  @Get()
  findAll() {
    return this.initialRepairRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.initialRepairRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInitialRepairRequestDto: UpdateInitialRepairRequestDto) {
    return this.initialRepairRequestsService.update(+id, updateInitialRepairRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.initialRepairRequestsService.remove(+id);
  }
}
