import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ColumnEntity } from './column.entity';
import { CardEntity } from './card.entity';
import { CommentEntity } from './comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  refreshToken: string;

  @OneToMany(() => ColumnEntity, (column) => column.user)
  columns: ColumnEntity[];

  @OneToMany(() => CardEntity, (column) => column.user)
  card: CardEntity[];

  @OneToMany(() => CommentEntity, (column) => column.user)
  comment: CommentEntity[];
}
