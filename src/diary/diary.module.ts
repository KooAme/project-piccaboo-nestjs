import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service';

@Module({
  providers: [DiaryService]
})
export class DiaryModule {}
