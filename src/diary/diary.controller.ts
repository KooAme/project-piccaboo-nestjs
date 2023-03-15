import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';

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
  @Post('')
  @UsePipes(ValidationPipe)
  createDiary(@Body() createDiaryDto: CreateDiaryDto, @Req() req: Request) {
    return this.diaryService.createDiary(createDiaryDto, req);
  }

  @Delete()
  deleteDiary() {}

  @Put()
  putDiary() {}
}
