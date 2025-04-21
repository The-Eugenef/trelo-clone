import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Refresh токен, полученный после логина',
  })
  @IsString({ message: 'Refresh token должен быть строкой' })
  refreshToken: string;
}
