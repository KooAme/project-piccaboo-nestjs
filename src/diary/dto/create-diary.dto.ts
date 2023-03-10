import { PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Diary } from '../entities/diary.entity';

export class CreateDiaryDto extends PickType(Diary, [
  'title',
  'content',
  'year',
  'month',
]) {}

export class CreateDiaryOutput extends CoreOutput {}
