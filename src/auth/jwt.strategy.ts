import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //Request에서 JWT를 추출. Authorization 헤더에 bearer토큰을 제공하는 표준방식사용
      ignoreExpiration: false,
      //JWT가 Passport모듈에 만료되지 않았는지 확인하는 책임을 위임
      //만료된 JWT가 제공되면 401 응답, Passport는 편리하게 자동으로 이를 처리
      secretOrKey: jwtConstants.secret,
      //토큰서명을 위한 대칭비밀을 제공하는 옵션. 공개적으로 노출금지
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
