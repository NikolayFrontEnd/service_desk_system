import { Test, TestingModule } from '@nestjs/testing';
import { InitialRepairRequestsService } from './initial-repair-requests.service';
import { PrismaService } from '../prisma/prisma.service';

describe('InitialRepairRequestsService', () => {
  let service: InitialRepairRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InitialRepairRequestsService,
        {
          provide: PrismaService,
          useValue: {
            initialRepairRequest: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<InitialRepairRequestsService>(
      InitialRepairRequestsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
