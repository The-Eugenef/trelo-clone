import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Почтовый адрес пользователя. Должен быть валидным email.',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя. Должен быть строкой длиной от 6 до 20 символов.',
    example: 'strongpassword123',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
