import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {}
//AccessToken이 만료되었을 때, 클라이언트의 요청으로 RefreshToken을 검증하게 됨
