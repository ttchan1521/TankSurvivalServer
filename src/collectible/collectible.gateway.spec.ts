import { Test, TestingModule } from '@nestjs/testing';
import { CollectibleGateway } from './collectible.gateway';
import { CollectibleService } from './collectible.service';

describe('CollectibleGateway', () => {
  let gateway: CollectibleGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectibleGateway, CollectibleService],
    }).compile();

    gateway = module.get<CollectibleGateway>(CollectibleGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
