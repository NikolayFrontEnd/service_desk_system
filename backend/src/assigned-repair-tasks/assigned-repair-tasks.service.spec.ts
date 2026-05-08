import { Test, TestingModule } from '@nestjs/testing';
import { AssignedRepairTasksService } from './assigned-repair-tasks.service';

describe('AssignedRepairTasksService', () => {
  let service: AssignedRepairTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignedRepairTasksService],
    }).compile();

    service = module.get<AssignedRepairTasksService>(AssignedRepairTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
