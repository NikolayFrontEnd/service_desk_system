import { Test, TestingModule } from '@nestjs/testing';
import { InitialRepairRequestsController } from './initial-repair-requests.controller';
import { InitialRepairRequestsService } from './initial-repair-requests.service';

describe('InitialRepairRequestsController', () => {
  let controller: InitialRepairRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InitialRepairRequestsController],
      providers: [
        {
          provide: InitialRepairRequestsService,
          useValue: {
            createInitialRepairRequest: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InitialRepairRequestsController>(
      InitialRepairRequestsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
