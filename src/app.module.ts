import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middlewares';
import { UsersModule } from './users/users.module';

//const getEnv = async () => {
//  const response = await 비동기처리가 필요할 때 load를 사용하면 env도 비동기가 가능
//}

@Module({
  //데코레이터
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule], //load:[getEnv]
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*'); //router전체에 적용
  }
}
