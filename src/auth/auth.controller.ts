import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.sighUp(createUserDto);
  }

  @Post('signin')
  signIn(@Body() data: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signIn(data, res);
  }
}
