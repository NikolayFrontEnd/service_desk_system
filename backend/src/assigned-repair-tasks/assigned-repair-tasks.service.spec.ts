import { Test, TestingModule } from '@nestjs/testing';
import { AssignedRepairTasksService } from './assigned-repair-tasks.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AssignedRepairTasksService', () => {
  let service: AssignedRepairTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignedRepairTasksService,
        {
          provide: PrismaService,
          useValue: {
            initialRepairRequest: {
              findUnique: jest.fn(),
            },
            technician: {
              findMany: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AssignedRepairTasksService>(
      AssignedRepairTasksService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
