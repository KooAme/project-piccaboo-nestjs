import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRespository } from 'src/users/repositories/users.repository';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import argon2 from 'argon2';
import { domainToASCII } from 'url';

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
      throw new BadRequestException('This user already exists');
    }

    const nicknameExists = await this.userRespository.existsNickname(
      createUserDto.nickname,
    );
    if (nicknameExists) {
      throw new BadRequestException('This nickname already exists');
    }
    const hash = await argon2.hash(createUserDto.password);
    const newUser = await this.userRespository.createUser(
      createUserDto.email,
      hash,
      createUserDto.nickname,
    );

    const { email, nickname } = createUserDto;
    const tokens = await this.getTokens({
      sub: newUser.id,
      nickname: newUser.nickname,
    });
    // http only -> refreshtoken
    await this.userRespository.createUser(email, hash, nickname);
    return { message: 'success create user!' }; // accessToken
  }

  async signIn(data: AuthDto): Promise<any> {
    try {
      const user = await this.userRespository.existsUser(data.email);
      if (!user) throw new BadRequestException('Check your email.');

      const passwordCheck = await bcrypt.compare(data.password, user.password);
      if (!passwordCheck) throw new BadRequestException('Check your password.');
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
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 15,
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 60 * 24 * 7,
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
