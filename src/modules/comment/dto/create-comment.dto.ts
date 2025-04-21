import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateCommentDto {
  @Expose()
  @ApiProperty({ example: 'Очень важный комментарий' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
