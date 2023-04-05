import { PartialType } from '@nestjs/mapped-types';
import { CreatePvpDto } from './create-pvp.dto';

export class UpdatePvpDto extends PartialType(CreatePvpDto) {
  id: number;
}
