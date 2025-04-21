import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnEntity } from './column.entity';
import { CommentEntity } from './comment.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class CardEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => ColumnEntity, (column) => column.cards)
  column: ColumnEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.card)
  comments: CommentEntity[];

  @ManyToOne(() => User, (user) => user.columns)
  user: User;
}
