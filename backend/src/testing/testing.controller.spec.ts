import { Test, TestingModule } from '@nestjs/testing';
import { TestingController } from './testing.controller';
import { TestingService } from './testing.service';

describe('TestingController', () => {
  let controller: TestingController;
  const testingServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestingController],
      providers: [
        {
          provide: TestingService,
          useValue: testingServiceMock,
        },
      ],
    }).compile();

    controller = module.get<TestingController>(TestingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
