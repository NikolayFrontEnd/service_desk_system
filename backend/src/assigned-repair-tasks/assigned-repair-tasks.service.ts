import { BadRequestException, Injectable } from '@nestjs/common';
import type { Technician } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignedRepairTaskDto } from './dto/create-assigned-repair-task.dto';
import * as fs from 'fs';
import * as path from 'path';

type FaultCatalogItem = {
  id: number;
  code: string;
  title: string;
  category: string;
  complexity: number;
  averageRepairTimeMinutes: number;
  recommendedSpecialization: string;
};

@Injectable()
export class AssignedRepairTasksService {
  constructor(private readonly prisma: PrismaService) {}

  async createAssignedRepairTask(
    createAssignedRepairTaskDto: CreateAssignedRepairTaskDto,
  ) {
    const initialRequest = await this.prisma.initialRepairRequest.findUnique({
      where: {
        id: createAssignedRepairTaskDto.originalRequestId,
      },
    });

    if (!initialRequest) {
      throw new BadRequestException('Initial repair request was not found');
    }

    const faultCatalog = this.getFaultCatalog();

    const fault = faultCatalog.find(
      (item) =>
        item.title.trim().toLowerCase() ===
        createAssignedRepairTaskDto.faultTitle.trim().toLowerCase(),
    );

    if (!fault) {
      throw new BadRequestException('Fault title was not found in catalog');
    }

    const technicians = await this.prisma.technician.findMany();

    if (technicians.length === 0) {
      throw new BadRequestException('There are no technicians in database');
    }

    const bestTechnician = this.findBestTechnician(
      technicians,
      fault,
      initialRequest.department ?? '',
      initialRequest.workImpact ?? '',
    );

    if (!bestTechnician) {
      throw new BadRequestException('No suitable technician was found');
    }

    const priority = this.getPriorityFromWorkImpact(
      initialRequest.workImpact ?? '',
    );

    const createdAt = Math.floor(Date.now() / 1000);

    const result = await this.prisma.$transaction(async (tx) => {
      const assignedTask = await tx.assignedRepairTask.create({
        data: {
          originalRequestId: initialRequest.id,
          department: initialRequest.department,
          floor: initialRequest.floor,
          room: initialRequest.room,
          faultTypeCode: fault.code,
          category: fault.category,
          complexityLevel: fault.complexity,
          estimatedRepairMinutes: fault.averageRepairTimeMinutes,
          priority: priority,
          assignedTechnicianId: bestTechnician.id,
          createdAt: createdAt,
          startedAt: null,
          status: 'ASSIGNED',
        },
      });

      await tx.technician.update({
        where: {
          id: bestTechnician.id,
        },
        data: {
          currentLoadMinutes:
            (bestTechnician.currentLoadMinutes ?? 0) +
            fault.averageRepairTimeMinutes,
          activeTasksCount: (bestTechnician.activeTasksCount ?? 0) + 1,
        },
      });

      await tx.initialRepairRequest.delete({
        where: {
          id: initialRequest.id,
        },
      });

      return assignedTask;
    });

    return {
      message: 'Repair task was assigned successfully',
      task: result,
      selectedFault: {
        title: fault.title,
        code: fault.code,
        category: fault.category,
        complexity: fault.complexity,
        estimatedRepairMinutes: fault.averageRepairTimeMinutes,
      },
      assignedTechnician: {
        id: bestTechnician.id,
        userId: bestTechnician.userId,
        specializations: bestTechnician.specializations,
        skillLevel: bestTechnician.skillLevel,
        currentStatus: bestTechnician.currentStatus,
      },
    };
  }

  private getFaultCatalog(): FaultCatalogItem[] {
    const filePath = path.join(process.cwd(), 'data', 'fault-catalog.json');

    const file = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(file) as FaultCatalogItem[];
  }

  private getPriorityFromWorkImpact(workImpact: string): string {
    if (workImpact === 'CANNOT_WORK') {
      return 'HIGH';
    }

    if (workImpact === 'PARTIALLY_CAN_WORK') {
      return 'MEDIUM';
    }

    if (workImpact === 'CAN_WAIT') {
      return 'LOW';
    }

    if (workImpact === 'NOT_URGENT') {
      return 'LOWEST';
    }

    return 'MEDIUM';
  }

  private findBestTechnician(
    technicians: Technician[],
    fault: FaultCatalogItem,
    department: string,
    workImpact: string,
  ): Technician | null {
    let bestTechnician: Technician | null = null;
    let bestScore = -999;

    for (const technician of technicians) {
      const score = this.calculateTechnicianScore(
        technician,
        fault,
        department,
        workImpact,
      );

      if (score > bestScore) {
        bestScore = score;
        bestTechnician = technician;
      }
    }

    return bestTechnician;
  }

  private calculateTechnicianScore(
    technician: Technician,
    fault: FaultCatalogItem,
    department: string,
    workImpact: string,
  ): number {
    const S = this.getSpecializationScore(
      technician.specializations ?? '',
      fault.recommendedSpecialization,
    );

    const L = this.getLoadScore(
      technician.currentLoadMinutes ?? 0,
      technician.maxDailyLoadMinutes ?? 0,
    );

    const T = this.getTimeScore(
      technician.currentLoadMinutes ?? 0,
      technician.maxDailyLoadMinutes ?? 0,
      fault.averageRepairTimeMinutes,
    );

    const D = this.getDepartmentScore(
      technician.currentDepartment ?? '',
      department,
    );

    const E = this.getExperienceScore(
      technician.skillLevel ?? 0,
      fault.complexity,
    );

    const R = this.getRiskScore(
      workImpact,
      technician.currentLoadMinutes ?? 0,
      technician.maxDailyLoadMinutes ?? 0,
    );

    const P = this.getPenaltyScore(technician, fault);

    return 0.3 * S + 0.25 * L + 0.15 * T + 0.1 * D + 0.1 * E + 0.1 * R - P;
  }

  private getSpecializationScore(
    technicianSpecializations: string,
    recommendedSpecialization: string,
  ): number {
    if (!technicianSpecializations) {
      return 0;
    }

    if (technicianSpecializations.includes(recommendedSpecialization)) {
      return 1;
    }

    if (technicianSpecializations.includes('UNIVERSAL')) {
      return 0.8;
    }

    return 0.3;
  }

  private getLoadScore(
    currentLoadMinutes: number,
    maxDailyLoadMinutes: number,
  ): number {
    if (maxDailyLoadMinutes === 0) {
      return 0;
    }

    const freeLoad = maxDailyLoadMinutes - currentLoadMinutes;

    if (freeLoad <= 0) {
      return 0;
    }

    return freeLoad / maxDailyLoadMinutes;
  }

  private getTimeScore(
    currentLoadMinutes: number,
    maxDailyLoadMinutes: number,
    estimatedRepairMinutes: number,
  ): number {
    const freeTime = maxDailyLoadMinutes - currentLoadMinutes;

    if (freeTime >= estimatedRepairMinutes) {
      return 1;
    }

    return 0.3;
  }

  private getDepartmentScore(
    technicianDepartment: string,
    requestDepartment: string,
  ): number {
    if (technicianDepartment === requestDepartment) {
      return 1;
    }

    return 0.4;
  }

  private getExperienceScore(skillLevel: number, complexity: number): number {
    if (skillLevel >= complexity) {
      return 1;
    }

    return skillLevel / complexity;
  }

  private getRiskScore(
    workImpact: string,
    currentLoadMinutes: number,
    maxDailyLoadMinutes: number,
  ): number {
    const freeTime = maxDailyLoadMinutes - currentLoadMinutes;

    if (workImpact === 'CANNOT_WORK' && freeTime > 120) {
      return 1;
    }

    if (workImpact === 'PARTIALLY_CAN_WORK' && freeTime > 60) {
      return 0.8;
    }

    if (workImpact === 'CAN_WAIT') {
      return 0.6;
    }

    if (workImpact === 'NOT_URGENT') {
      return 0.4;
    }

    return 0.5;
  }

  private getPenaltyScore(
    technician: Technician,
    fault: FaultCatalogItem,
  ): number {
    let penalty = 0;

    if (technician.currentStatus === 'UNAVAILABLE') {
      penalty += 10;
    }

    if (
      (technician.currentLoadMinutes ?? 0) >=
      (technician.maxDailyLoadMinutes ?? 0)
    ) {
      penalty += 1;
    }

    if (
      !technician.specializations?.includes(fault.recommendedSpecialization) &&
      !technician.specializations?.includes('UNIVERSAL')
    ) {
      penalty += 0.3;
    }

    return penalty;
    
  }
  async startRepairTask(taskId: number) {
  const task = await this.prisma.assignedRepairTask.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    throw new BadRequestException('Assigned repair task was not found');
  }

  if (task.status === 'IN_PROGRESS') {
    throw new BadRequestException('This repair task is already in progress');
  }

  if (task.status === 'COMPLETED') {
    throw new BadRequestException('This repair task is already completed');
  }

  const startedAt = new Date().toISOString();

  const updatedTask = await this.prisma.$transaction(async (tx) => {
    const updatedRepairTask = await tx.assignedRepairTask.update({
      where: {
        id: taskId,
      },
      data: {
        startedAt: startedAt,
        status: 'IN_PROGRESS',
      },
    });

    if (task.assignedTechnicianId) {
      await tx.technician.update({
        where: {
          id: task.assignedTechnicianId,
        },
        data: {
          currentStatus: 'BUSY',
        },
      });
    }

    return updatedRepairTask;
  });

  return {
    message: 'Repair task was started successfully',
    task: updatedTask,
  };
}
async finishRepairTask(taskId: number) {
  const task = await this.prisma.assignedRepairTask.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    throw new BadRequestException('Assigned repair task was not found');
  }

  const result = await this.prisma.$transaction(async (tx) => {
    let newCurrentLoadMinutes = 0;
    let newActiveTasksCount = 0;
    let newCurrentStatus = 'AVAILABLE';

    if (task.assignedTechnicianId) {
      const technician = await tx.technician.findUnique({
        where: {
          id: task.assignedTechnicianId,
        },
      });

      if (technician) {
        newCurrentLoadMinutes =
          (technician.currentLoadMinutes ?? 0) -
          (task.estimatedRepairMinutes ?? 0);

        newActiveTasksCount = (technician.activeTasksCount ?? 0) - 1;

        newCurrentLoadMinutes = Math.max(newCurrentLoadMinutes, 0);
        newActiveTasksCount = Math.max(newActiveTasksCount, 0);

        if (newActiveTasksCount === 0) {
          newCurrentStatus = 'AVAILABLE';
        } else {
          newCurrentStatus = technician.currentStatus ?? 'BUSY';
        }

        await tx.technician.update({
          where: {
            id: task.assignedTechnicianId,
          },
          data: {
            currentLoadMinutes: newCurrentLoadMinutes,
            activeTasksCount: newActiveTasksCount,
            currentStatus: newCurrentStatus,
          },
        });
      }
    }

    const deletedTask = await tx.assignedRepairTask.delete({
      where: {
        id: taskId,
      },
    });

    return {
      deletedTask,
      newCurrentLoadMinutes,
      newActiveTasksCount,
      newCurrentStatus,
    };
  });

  return {
    message: 'Repair task was finished and deleted successfully',
    deletedTaskId: result.deletedTask.id,
    technicianId: task.assignedTechnicianId,
    removedMinutes: task.estimatedRepairMinutes,
    technicianCurrentLoadMinutes: result.newCurrentLoadMinutes,
    technicianActiveTasksCount: result.newActiveTasksCount,
    technicianCurrentStatus: result.newCurrentStatus,
  };
}
}
