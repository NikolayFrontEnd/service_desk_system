import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInitialRepairRequestDto } from './dto/create-initial-repair-request.dto';

@Injectable()
export class InitialRepairRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async createInitialRepairRequest(
    createInitialRepairRequestDto: CreateInitialRepairRequestDto,
    userId: number,
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

    const employee = await this.prisma.employee.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!employee) {
      throw new BadRequestException('Employee profile was not found');
    }

    const initialRepairRequest = await this.prisma.initialRepairRequest.create({
      data: {
        department: employee.department,
        floor: employee.floor,
        room: employee.room,
        workImpact: createInitialRepairRequestDto.workImpact,
      },
    });

    return {
      message: 'Initial repair request created successfully',
      request: initialRepairRequest,
    };
  }

  async getInitialRepairRequests() {
    const requests = await this.prisma.initialRepairRequest.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return {
      message: 'Initial repair requests loaded successfully',
      requests: requests,
    };
  }
}