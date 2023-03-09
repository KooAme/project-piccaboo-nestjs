import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DiaryService } from './diary.service';

@Controller('diarys')
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @Get('/:id')
  getAllDiary() {
    return this.diaryService.getAllDiarys();
  }

  @Delete('/:id')
  deleteDiary() {}

  @Put('/:id')
  putDiary() {}

  @Post()
  createDiary(@Body('title') title: string, @Body('content') content: string) {
    // return this.diaryService.createDiary(title, content);
  }
}
