import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateCardDto {
  @Expose()
  @ApiProperty({ example: 'Task 1', description: 'Заголовок карточки' })
  @IsString()
  title: string;
}
