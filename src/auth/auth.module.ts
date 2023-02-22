import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRespository } from 'src/users/repositories/users.repository';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { TypeOrmExModule } from 'src/common/custom-repository.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({}),
    TypeOrmExModule.forCustomRepository([UserRespository]),
  ],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
