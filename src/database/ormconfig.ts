import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
export const typeORMConfig: TypeOrmModule = {
  type: 'postgres' as 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'koo',
  password: 'Ayakoobori4114!!',
  database: 'picaboo',
  entities: [User],
  synchronize: true,
};
