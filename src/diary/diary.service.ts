import { Injectable } from '@nestjs/common';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { DiaryRepository } from './repositories/diary.repository';

@Injectable()
export class DiaryService {
  constructor(private diaryRepository: DiaryRepository) {}
  private diarys = []; //임시 Mock data

  async createDiary(createDiaryDto: CreateDiaryDto) {
    try {
      await this.diaryRepository.createDiary({
        ...createDiaryDto,
      });
      return {
        ok: true,
        message: 'created diary',
      };
    } catch (error) {
      return {
        ok: false,
        error,
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
