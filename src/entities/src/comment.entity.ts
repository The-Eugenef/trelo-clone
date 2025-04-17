import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CardEntity } from './card.entity';
import { User } from './user.entity';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => CardEntity, (card) => card.comments)
  card: CardEntity;

  @ManyToOne(() => User, (user) => user.columns)
  user: User;
}
