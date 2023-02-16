import { join } from 'path';
import { User } from 'src/users/entities/user.entity';

export const a = {
  type: 'mysql' as 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'passport',
  entities: [User],
  synchronize: true,
};
