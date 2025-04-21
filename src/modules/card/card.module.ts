import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity, ColumnEntity } from '@entities';
import { CardService } from './card.service';
import { AuthModule } from '@modules/auth';
import { CardController } from './card.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, ColumnEntity]), AuthModule],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
