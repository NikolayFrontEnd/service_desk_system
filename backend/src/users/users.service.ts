import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const allowedRoles = ['EMPLOYEE', 'SUPPORT', 'TECHNICIAN'];

    if (!allowedRoles.includes(createUserDto.role)) {
      throw new BadRequestException('Invalid user role');
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    if (createUserDto.role === 'EMPLOYEE' && !createUserDto.employee) {
      throw new BadRequestException('Employee data is required');
    }

    if (createUserDto.role === 'TECHNICIAN' && !createUserDto.technician) {
      throw new BadRequestException('Technician data is required');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);

    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          passwordHash: passwordHash,
          role: createUserDto.role,
        },
      });

      if (createUserDto.role === 'EMPLOYEE') {
        await tx.employee.create({
          data: {
            userId: user.id,
            department: createUserDto.employee!.department,
            floor: createUserDto.employee!.floor,
            room: createUserDto.employee!.room,
          },
        });
      }

      if (createUserDto.role === 'TECHNICIAN') {
        await tx.technician.create({
          data: {
            userId: user.id,
            specializations: createUserDto.technician!.specializations,
            skillLevel: createUserDto.technician!.skillLevel,
            experienceYears: createUserDto.technician!.experienceYears,
            currentStatus: createUserDto.technician!.currentStatus,
            currentLoadMinutes: createUserDto.technician!.currentLoadMinutes,
            activeTasksCount: createUserDto.technician!.activeTasksCount,
            maxDailyLoadMinutes: createUserDto.technician!.maxDailyLoadMinutes,
            currentDepartment: createUserDto.technician!.currentDepartment,
          },
        });
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    });

    return {
      message: 'User created successfully',
      user: result,
    };
  }

  async getMyAssignedRepairTasks(userId: number) {
  const technician = await this.prisma.technician.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!technician) {
    throw new BadRequestException('Technician profile was not found');
  }

  const tasks = await this.prisma.assignedRepairTask.findMany({
    where: {
      assignedTechnicianId: technician.id,
    },
    orderBy: {
      id: 'asc',
    },
  });

  return {
    message: 'Technician assigned repair tasks loaded successfully',
    technician: {
      id: technician.id,
      userId: technician.userId,
      specializations: technician.specializations,
      skillLevel: technician.skillLevel,
      currentStatus: technician.currentStatus,
      currentLoadMinutes: technician.currentLoadMinutes,
      activeTasksCount: technician.activeTasksCount,
    },
    tasks: tasks,
  };
}
}
