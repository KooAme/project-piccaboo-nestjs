import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRespository } from 'src/users/repositories/users.repository';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';

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
    // 닉네임 유효성검사
    // const nicknameExists = await this.userRespository.existsNickname(
    //   createUserDto.nickname,
    // );
    // if (nicknameExists) {
    //   throw new BadRequestException('This nickname already exists');
    // }
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const { email } = createUserDto;

    await this.userRespository.createUser(email, hash);
    return { message: 'Success create user!' };
  }

  async signIn(data: AuthDto, res: Response): Promise<any> {
    try {
      const user = await this.userRespository.existsUser(data.email);
      if (!user) throw new BadRequestException('Check your email.');

      const passwordCheck = await bcrypt.compare(data.password, user.password);

      if (!passwordCheck) throw new BadRequestException('Check your password.');
      const tokens = await this.getTokens({
        sub: user.id,
      });
      res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
      return { accessToken: tokens.accessToken };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed Login');
    }
  }

  async getTokens(payload: { sub: number }) {
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
