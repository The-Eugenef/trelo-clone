import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponseCommentDto } from '@modules/comment/dto';
import { ResponseUserDto } from '@modules/user';

export class ResponseCardDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'ID карточки' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Task 1', description: 'Заголовок карточки' })
  title: string;

  @Expose()
  @ApiProperty({
    description: 'Комментарии, прикреплённые к карточке',
    type: () => [ResponseCommentDto],
  })
  @Type(() => ResponseCommentDto)
  comments: ResponseCommentDto[];

  @Expose()
  @ApiProperty({
    description: 'Пользователь, создавший карточку',
    type: () => ResponseUserDto,
  })
  @Type(() => ResponseUserDto)
  user: ResponseUserDto;

  @Expose()
  @ApiProperty({
    example: '2024-04-18T12:00:00.000Z',
    description: 'Дата создания',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    example: '2024-04-18T12:30:00.000Z',
    description: 'Дата последнего обновления',
  })
  updatedAt: Date;
}

export class ResponseCardSmallInfoDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'ID карточки' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Task 1', description: 'Заголовок карточки' })
  title: string;

  @Expose()
  @ApiProperty({
    description: 'Пользователь, создавший карточку',
    type: () => ResponseUserDto,
  })
  @Type(() => ResponseUserDto)
  user: ResponseUserDto;

  @Expose()
  @ApiProperty({
    example: '2024-04-18T12:00:00.000Z',
    description: 'Дата создания',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    example: '2024-04-18T12:30:00.000Z',
    description: 'Дата последнего обновления',
  })
  updatedAt: Date;
}
