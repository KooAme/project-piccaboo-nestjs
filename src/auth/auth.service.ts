import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRespository } from 'src/users/repositories/users.repository';
import { AuthDto } from './dto/auth.dto';

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

    // const hash = await this.hashData(createUserDto.password);
    // const newUser = await this.userRespository.createUser({
    //   ...createUserDto,
    //   password: hash,
    // });
  }

  async signIn(data: AuthDto) {
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
}
