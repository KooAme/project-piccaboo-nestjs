import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsString()
  nickname: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;
}
