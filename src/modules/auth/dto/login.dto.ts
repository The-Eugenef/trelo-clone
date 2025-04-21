import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Некорректный формат email' }) // todo: можно сделать более серьезную проверку но для тестового думаю хватит
  email: string;

  @ApiProperty({ example: 'strongpassword123', description: 'User password' })
  @IsString()
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' }) //todo: можно еще пару условий добавить
  password: string;
}
