import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  //데코레이터
  imports: [AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
