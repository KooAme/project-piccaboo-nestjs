import { IsBoolean, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class Diary {
  @Column()
  @IsString()
  title: string;

  @Column({ type: 'text' })
  @IsString()
  content: string;

  @Column({ default: false })
  @IsBoolean()
  complete: boolean;
}
