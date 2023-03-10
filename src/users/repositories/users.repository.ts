import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CustomRepository } from 'src/common/custom-repository.decorator';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
@CustomRepository(User)
export class UserRespository {
  constructor(
    @InjectRepository(User)
    private userRespository: Repository<User>,
  ) {}

  async existsUser(email) {
    try {
      const exists = await this.userRespository.findOneBy({ email });
      return exists;
    } catch (error) {
      throw new BadRequestException('Exists User');
    }
  }

  async existsNickname(nickname) {
    try {
      const exists = await this.userRespository.findOneBy({ nickname });
      return exists;
    } catch (error) {
      throw new BadRequestException('Exists Nickname');
    }
  }

  async createUser(email, password, nickname) {
    try {
      const user = await this.userRespository.save(
        this.userRespository.create({ email, password, nickname }),
      );
      return user;
    } catch (error) {
      throw new BadRequestException('Create User error');
    }
  }
}
