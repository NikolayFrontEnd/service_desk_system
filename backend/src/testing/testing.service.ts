import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestingDto } from './dto/create-testing.dto';
import { UpdateTestingDto } from './dto/update-testing.dto';
import { Testing } from './entities/testing.entity';

@Injectable()
export class TestingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTestingDto: CreateTestingDto): Promise<Testing> {
    const name = this.validateName(createTestingDto.name);

    return this.prisma.testing.create({
      data: {
        name,
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
      throw new NotFoundException(`Testing item with id ${id} not found`);
    }

    return user;
  }

  async update(
    id: number,
    updateTestingDto: UpdateTestingDto,
  ): Promise<Testing> {
    if (updateTestingDto.name === undefined) {
      throw new BadRequestException('No fields to update');
    }

    const name = this.validateName(updateTestingDto.name);

    await this.findOne(id);

    return this.prisma.testing.update({
      where: {
        id,
      },
      data: {
        name,
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
      message: `Testing item with id ${id} was deleted`,
    };
  }

  private validateName(name: unknown): string {
    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new BadRequestException('Name must be a non-empty string');
    }

    return name.trim();
  }
}
