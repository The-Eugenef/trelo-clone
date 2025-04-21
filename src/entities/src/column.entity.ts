import { User } from './user.entity';
import { CardEntity } from './card.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class ColumnEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.columns)
  user: User;

  @OneToMany(() => CardEntity, (card) => card.column)
  cards: CardEntity[];
}
