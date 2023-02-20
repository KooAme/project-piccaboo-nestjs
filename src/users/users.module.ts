import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserRespository } from './repositories/users.repository';
import { TypeOrmExModule } from 'src/common/custom-repository.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRespository]),
  ],
  providers: [UsersService, UserRespository],
  exports: [UsersService, UserRespository],
  controllers: [UsersController],
})
export class UsersModule {}
