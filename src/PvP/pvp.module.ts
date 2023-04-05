import { Module } from '@nestjs/common';
import { PvpService } from './pvp.service';
import { PvpGateway } from './pvp.gateway';

@Module({
  providers: [PvpGateway, PvpService]
})
export class PvpModule {}
