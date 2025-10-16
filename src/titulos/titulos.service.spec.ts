import { Test, TestingModule } from '@nestjs/testing';
import { TitulosService } from './titulos.service';

describe('TitulosService', () => {
  let service: TitulosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TitulosService],
    }).compile();

    service = module.get<TitulosService>(TitulosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
