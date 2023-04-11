import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitGateway } from './unit.gateway';

@Module({
  providers: [UnitGateway, UnitService],
})
export class UnitModule {}
