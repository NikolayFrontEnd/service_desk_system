import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestingDto } from './dto/create-testing.dto';
import { UpdateTestingDto } from './dto/update-testing.dto';
import { Testing } from './entities/testing.entity';

@Injectable()
export class TestingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTestingDto: CreateTestingDto): Promise<Testing> {
    return this.prisma.testing.create({
      data: {
        name: createTestingDto.name,
      },
    });
  }

  async findAll(): Promise<Testing[]> {
    return this.prisma.testing.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<Testing> {
    const user = await this.prisma.testing.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateTestingDto: UpdateTestingDto): Promise<Testing> {
    await this.findOne(id);

    return this.prisma.testing.update({
      where: {
        id,
      },
      data: {
        name: updateTestingDto.name,
      },
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prisma.testing.delete({
      where: {
        id,
      },
    });

    return {
      message: `User with id ${id} was deleted`,
    };
  }
}