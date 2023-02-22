import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';

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

  @UseGuards(AccessTokenGuard)
  @Get()
  user(@Req() req: Request) {
    return req.user;
  }
}
