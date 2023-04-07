import { Test, TestingModule } from '@nestjs/testing';
import { PvpGateway } from './pvp.gateway';
import { PvpService } from './pvp.service';

describe('PvpGateway', () => {
  let gateway: PvpGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PvpGateway, PvpService],
    }).compile();

    gateway = module.get<PvpGateway>(PvpGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
