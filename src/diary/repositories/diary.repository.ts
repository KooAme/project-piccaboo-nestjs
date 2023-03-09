import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRepository } from 'src/common/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Diary } from '../entities/diary.entity';

Injectable();
@CustomRepository(Diary)
export class DiaryRepository {
  constructor(
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>,
  ) {}

  async createDiary({ title, content }) {
    try {
      const diary = await this.diaryRepository.save(
        this.diaryRepository.create({
          title,
          content,
        }),
      );
      console.log(diary);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteDiary(diaryId) {
    try {
      await this.diaryRepository.softDelete({ id: diaryId });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateDiary(diaryId, updateDiaryInput) {
    try {
      await this.diaryRepository.save([
        {
          id: diaryId,
          ...updateDiaryInput,
        },
      ]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async searchDiary(searchDiary, page) {
    try {
    } catch (error) {}
  }
}
