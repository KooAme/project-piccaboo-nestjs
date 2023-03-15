import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateDiaryDto, CreateDiaryOutput } from './dto/create-diary.dto';
import { DiaryRepository } from './repositories/diary.repository';

@Injectable()
export class DiaryService {
  constructor(private diaryRepository: DiaryRepository) {}
  private diarys = []; //임시 Mock data

  async createDiary(
    createDiaryDto: CreateDiaryDto,
    req: Request,
  ): Promise<CreateDiaryOutput> {
    try {
      await this.diaryRepository.createDiary({
        ...createDiaryDto,
        userId: req.user['userId'],
      });
      console.log('Created Diary');
      return {
        ok: true,
      };
    } catch (error) {
      console.error('Failed');
      return {
        ok: false,
      };
    }
  }

  async getAllDiarys() {
    return this.diarys;
  }

  // async deleteDiary(diaryId: number, user) {
  //   try {
  //     const diary = await this.diaryRepository.showDiary(diaryId);
  //     console.log(diary);
  //     if (!diary) {
  //       return {
  //         ok: false,
  //         message: 'Not found diary',
  //       };
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
}
