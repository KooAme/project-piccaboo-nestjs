import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './movies/app.controller';

@Module({
  //데코레이터
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
