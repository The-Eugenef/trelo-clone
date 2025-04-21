import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CardEntity } from './card.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => CardEntity, (card) => card.comments)
  card: CardEntity;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
