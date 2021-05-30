import { Test, TestingModule } from '@nestjs/testing';
import { CustomerCarController } from './customer-car.controller';

describe('CustomerCarController', () => {
  let controller: CustomerCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerCarController],
    }).compile();

    controller = module.get<CustomerCarController>(CustomerCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
