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
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteDiary() {}
}
