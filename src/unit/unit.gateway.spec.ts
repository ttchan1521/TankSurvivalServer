import { Test, TestingModule } from '@nestjs/testing';
import { UnitGateway } from './unit.gateway';
import { UnitService } from './unit.service';

describe('UnitGateway', () => {
  let gateway: UnitGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitGateway, UnitService],
    }).compile();

    gateway = module.get<UnitGateway>(UnitGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
