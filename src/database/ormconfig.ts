import { User } from 'src/users/entities/user.entity';

export const a = {
  type: 'postgres' as 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'koo',
  password: '',
  database: 'picaboo',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
