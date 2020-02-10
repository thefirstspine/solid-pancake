import { Test, TestingModule } from '@nestjs/testing';
import { SirupController } from './sirup.controller';

describe('Sirup Controller', () => {
  let controller: SirupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SirupController],
    }).compile();

    controller = module.get<SirupController>(SirupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
