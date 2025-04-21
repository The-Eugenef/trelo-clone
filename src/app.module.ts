import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databseConfig } from './database.config';
import { AuthModule } from '@modules/auth';
import { UserModule } from '@modules/user';
import { ColumnModule } from '@modules/column';
import { CommentModule } from '@modules/comment/comment.module';
import { CardModule } from '@modules/card/card.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databseConfig),
    AuthModule,
    UserModule,
    ColumnModule,
    CommentModule,
    CardModule,
  ],
})
export class AppModule {}
