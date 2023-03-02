import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middlewares';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './database/ormconfig';
import { User } from './users/entities/user.entity';
// import { DiaryController } from './diary/diary.controller';
// import { DiaryModule } from './diary/diary.module';
//const getEnv = async () => {
//  const response = await 비동기처리가 필요할 때 load를 사용하면 env도 비동기가 가능
//}

@Module({
  //데코레이터
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(typeORMConfig),
    // DiaryModule,
  ], //load:[getEnv]
  // controllers: [DiaryController],
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*'); //router전체에 적용
  }
}
