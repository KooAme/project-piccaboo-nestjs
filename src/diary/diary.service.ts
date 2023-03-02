// import { Injectable } from '@nestjs/common';
// import { CreateDiaryDto } from './dto/create-diary.dto';
// import { DiaryRepository } from './repositories/diary.repository';

// @Injectable()
// export class DiaryService {
//   constructor(private diaryRepository: DiaryRepository) {}

//   async createDiary(createDiaryDto: CreateDiaryDto) {
//     try {
//       await this.diaryRepository.createDiary({
//         ...createDiaryDto,
//       });
//       return {
//         ok: true,
//         message: 'create diary',
//       };
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }
