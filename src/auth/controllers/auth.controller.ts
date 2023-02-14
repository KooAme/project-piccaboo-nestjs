import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  signup() {
    return '';
  }

  @Post('login')
  login() {
    return {};
  }

  @Get('logout')
  logout() {
    return {};
  }
}
