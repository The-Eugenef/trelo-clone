import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity, CommentEntity, User } from '@entities';
import { CreateCommentDto, UpdateCommentDto, ResponseCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,

    @InjectRepository(CardEntity)
    private readonly cardRepo: Repository<CardEntity>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateCommentDto, userId: number, cardId: number): Promise<ResponseCommentDto> {
    const card = await this.cardRepo.findOne({ where: { id: cardId } });
    if (!card) {
      throw new NotFoundException('Карточка не найдена');
    }

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const comment = this.commentRepo.create({ ...dto, user, card });
    const saved = await this.commentRepo.save(comment);
    return await this.getOne(saved.id);
  }

  async getOne(id: number): Promise<CommentEntity> {
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }

    return comment;
  }

  async update(commentId: number, dto: UpdateCommentDto): Promise<ResponseCommentDto> {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }

    Object.assign(comment, dto);
    const updated = await this.commentRepo.save(comment);

    return await this.getOne(updated.id);
  }

  async delete(commentId: number): Promise<void> {
    await this.getOne(commentId);
    await this.commentRepo.delete(commentId);
  }
}
