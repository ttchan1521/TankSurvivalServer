import { Module } from '@nestjs/common';
import { CollectibleService } from './collectible.service';
import { CollectibleGateway } from './collectible.gateway';

@Module({
  providers: [CollectibleGateway, CollectibleService]
})
export class CollectibleModule {}
