import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    //JWT표준,일관성 유지를 위해 userId값을 sub속성이름을 선택
    return {
      access_token: this.jwtService.sign(payload),
      //user객체 속성의 하위 집합에서 JWT를 생성한 다음 단일 access토큰 속성을 가진 객체로 반환
    };
  }
}
