import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInitialRepairRequestDto } from './dto/create-initial-repair-request.dto';

@Injectable()
export class InitialRepairRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async createInitialRepairRequest(
    createInitialRepairRequestDto: CreateInitialRepairRequestDto,
  ) {
    const allowedWorkImpacts = [
      'CANNOT_WORK',
      'PARTIALLY_CAN_WORK',
      'CAN_WAIT',
      'NOT_URGENT',
    ];

    if (
      !allowedWorkImpacts.includes(createInitialRepairRequestDto.workImpact)
    ) {
      throw new BadRequestException('Invalid work impact');
    }

    const initialRepairRequest = await this.prisma.initialRepairRequest.create({
      data: {
        department: createInitialRepairRequestDto.department,
        floor: createInitialRepairRequestDto.floor,
        room: createInitialRepairRequestDto.room,
        workImpact: createInitialRepairRequestDto.workImpact,
      },
    });

    return {
      message: 'Initial repair request created successfully',
      request: initialRepairRequest,
    };
  }
}
