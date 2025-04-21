import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({ example: 'Backlog', description: 'Название колонки' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: 'Порядок колонки', required: false })
  @IsOptional()
  @IsInt()
  order?: number;
}
