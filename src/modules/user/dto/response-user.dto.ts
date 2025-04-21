import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose()
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: 1,
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: 'Email пользователя',
    example: 'example@domain.com',
  })
  email: string;

  @Expose()
  @ApiProperty({
    description: 'Дата и время создания пользователя',
    example: '2025-04-17T12:00:00Z',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Дата и время последнего обновления данных пользователя',
    example: '2025-04-17T12:00:00Z',
  })
  updatedAt: Date;
}
