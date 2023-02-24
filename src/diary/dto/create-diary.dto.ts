import { IsString } from 'class-validator';

export class CreateDiaryDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
