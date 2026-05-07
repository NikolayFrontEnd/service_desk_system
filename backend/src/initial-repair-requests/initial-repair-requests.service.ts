import { Injectable } from '@nestjs/common';
import { CreateInitialRepairRequestDto } from './dto/create-initial-repair-request.dto';
import { UpdateInitialRepairRequestDto } from './dto/update-initial-repair-request.dto';

@Injectable()
export class InitialRepairRequestsService {
  create(createInitialRepairRequestDto: CreateInitialRepairRequestDto) {
    return 'This action adds a new initialRepairRequest';
  }

  findAll() {
    return `This action returns all initialRepairRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} initialRepairRequest`;
  }

  update(id: number, updateInitialRepairRequestDto: UpdateInitialRepairRequestDto) {
    return `This action updates a #${id} initialRepairRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} initialRepairRequest`;
  }
}
