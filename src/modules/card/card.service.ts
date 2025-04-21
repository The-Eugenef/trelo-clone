import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity, ColumnEntity } from '@entities';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ResponseCardDto } from './dto/response-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepo: Repository<CardEntity>,
    @InjectRepository(ColumnEntity)
    private readonly columnRepo: Repository<ColumnEntity>,
  ) {}

  async checkColumnExistence(columnId: number): Promise<void> {
    const column = await this.columnRepo.findOne({
      where: { id: columnId },
    });
    if (!column) {
      throw new NotFoundException('Колонка не найдена');
    }
  }

  async create(userId: number, columnId: number, dto: CreateCardDto): Promise<ResponseCardDto> {
    const card = this.cardRepo.create({
      ...dto,
      user: { id: userId },
      column: { id: columnId },
    });
    await this.checkColumnExistence(columnId);
    const created = await this.cardRepo.save(card);
    return await this.getOne(created.id);
  }

  async update(cardId: number, columnId: number, dto: UpdateCardDto): Promise<CardEntity> {
    const card = await this.cardRepo.findOne({
      where: { id: cardId },
    });

    await this.checkColumnExistence(columnId);

    if (!card) {
      throw new NotFoundException('Карточка не найдена');
    }

    Object.assign(card, dto);
    const updated = await this.cardRepo.save(card);

    return await this.getOne(updated.id);
  }

  async getOne(cardId: number): Promise<CardEntity> {
    const card = await this.cardRepo.findOne({
      where: { id: cardId },
      relations: ['user', 'comments', 'comments.user'],
    });

    if (!card) {
      throw new NotFoundException('Карточка не найдена');
    }
    return card;
  }

  async delete(cardId: number): Promise<void> {
    const card = await this.getOne(cardId);
    await this.cardRepo.remove(card);
  }
}
