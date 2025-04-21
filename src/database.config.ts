import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CardEntity, ColumnEntity, CommentEntity, User } from '@entities';

export const databseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_NAME || 'trello_clone',
  entities: [User, ColumnEntity, CardEntity, CommentEntity],
  synchronize: true,
};
