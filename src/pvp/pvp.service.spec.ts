import { Test, TestingModule } from '@nestjs/testing';
import { PvpService } from './pvp.service';

describe('PvpService', () => {
  let service: PvpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PvpService],
    }).compile();

    service = module.get<PvpService>(PvpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
