import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponseUserDto } from '@modules/user';
import { ResponseCardSmallInfoDto } from '@modules/card/dto';

export class ResponseColumnDto {
  @Expose()
  @ApiProperty({
    description: 'Уникальный идентификатор колонки',
    example: 1,
  })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Backlog', description: 'Название колонки' })
  @IsString()
  name: string;

  @Expose()
  @Type(() => ResponseUserDto)
  @ApiProperty({ type: () => ResponseUserDto, required: false })
  @IsOptional()
  user?: ResponseUserDto;

  @Expose()
  @Type(() => ResponseCardSmallInfoDto)
  @ApiProperty({ type: () => [ResponseCardSmallInfoDto], required: false })
  @IsOptional()
  cards?: ResponseCardSmallInfoDto[];
}
