import { CardEntity, CommentEntity, User } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CardModule } from '@modules/card/card.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, CardEntity, User]), CardModule, AuthModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
