import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from '@modules/user';

export class ResponseCommentDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Текст комментария' })
  content: string;

  @Expose()
  @ApiProperty({ type: () => ResponseUserDto })
  @Type(() => ResponseUserDto)
  user: ResponseUserDto;

  @Expose()
  @ApiProperty({ example: '2025-04-18T10:15:00.000Z' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '2025-04-18T10:20:00.000Z' })
  updatedAt: Date;
}
