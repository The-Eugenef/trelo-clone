import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto, UpdateColumnDto } from './dto';
import { ColumnEntity } from '@entities';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepo: Repository<ColumnEntity>,
  ) {}

  async getAllByUser(userId: number) {
    return this.columnRepo.find({ where: { user: { id: userId } } });
  }

  async create(userId: number, dto: CreateColumnDto) {
    const column = this.columnRepo.create({
      ...dto,
      user: { id: userId },
    });
    const savedColumn = await this.columnRepo.save(column);

    return this.getOne(userId, savedColumn.id);
  }

  async getOne(userId: number, id: number) {
    const column = await this.columnRepo.findOne({
      where: {
        id,
        user: { id: userId },
      },
      relations: ['user', 'cards'],
    });
    if (!column) throw new NotFoundException('Column not found');
    return column;
  }

  async update(userId: number, id: number, dto: UpdateColumnDto) {
    const column = await this.getOne(userId, id);
    Object.assign(column, dto);
    const newColumn = await this.columnRepo.save(column);
    return this.getOne(userId, newColumn.id);
  }

  async delete(userId: number, id: number) {
    const column = await this.getOne(userId, id);
    await this.columnRepo.remove(column);
  }
}
