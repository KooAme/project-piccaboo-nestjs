import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { DiaryService } from './diary.service';

@Controller('diarys')
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @Get()
  getAllDiary() {
    //모든 diary가져오기
    return this.diaryService.getAllDiarys();
  }

  @Get('/:id')
  getDiary() {
    //diary한개
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  createDiary() {
    // return this.diaryService.createDiary(title, content);
  }

  @Delete()
  deleteDiary() {}

  @Put()
  putDiary() {}
}
