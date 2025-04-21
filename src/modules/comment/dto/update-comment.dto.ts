import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateCommentDto {
  @Expose()
  @ApiProperty({ example: 'Обновлённый комментарий', required: false })
  @IsOptional()
  @IsString()
  text?: string;
}
