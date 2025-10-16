import { Test, TestingModule } from '@nestjs/testing';
import { TitulosController } from './titulos.controller';
import { TitulosService } from './titulos.service';

describe('TitulosController', () => {
  let controller: TitulosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TitulosController],
      providers: [TitulosService],
    }).compile();

    controller = module.get<TitulosController>(TitulosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
