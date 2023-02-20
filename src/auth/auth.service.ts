import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRespository } from 'src/users/repositories/users.repository';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRespository: UserRespository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async sighUp(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.userRespository.existsUser(
      createUserDto.email,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const nicknameExists = await this.userRespository.existsNickname(
      createUserDto.nickname,
    );
    if (nicknameExists) {
      throw new BadRequestException('This nickname already exists');
    }
    const hash = await argon2.hash(createUserDto.password);
    // return await this.userRespository.create(createUserDto)
    const { email, nickname } = createUserDto;
    await this.userRespository.createUser(email, hash, nickname);
    // 바로 로그인처리?
    // 유저만 만들고 성공 보내기
    return { message: 'success create user!' };
  }

  async signIn(createUserDto: CreateUserDto): Promise<any> {
    // const { email, password } = createUserDto;

    try {
      // const user = await this.user
    } catch (error) {
      console.error(error);
    }
    //JWT표준,일관성 유지를 위해 userId값을 sub속성이름을 선택
    return {
      // access_token: this.jwtService.sign(payload),
      //user객체 속성의 하위 집합에서 JWT를 생성한 다음 단일 access토큰 속성을 가진 객체로 반환
    };
  }

  async getTokens(payload: { sub: number; nickname: string }) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_ACCESS_SECRET,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return { accessToken, refreshToken };
  }
}
