import { Test, TestingModule } from '@nestjs/testing';
import { AssignedRepairTasksController } from './assigned-repair-tasks.controller';
import { AssignedRepairTasksService } from './assigned-repair-tasks.service';

describe('AssignedRepairTasksController', () => {
  let controller: AssignedRepairTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignedRepairTasksController],
      providers: [AssignedRepairTasksService],
    }).compile();

    controller = module.get<AssignedRepairTasksController>(AssignedRepairTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
