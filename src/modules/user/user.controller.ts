import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto, ResponseUserDto } from './dto';
import { plainToClass } from 'class-transformer';
import { OwnershipGuard } from '@modules/auth/auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), OwnershipGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Получение всех пользователей',
    description: 'Возвращает список всех зарегистрированных пользователей.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список всех пользователей',
    type: [ResponseUserDto],
  })
  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) =>
      plainToClass(ResponseUserDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получение одного пользователя по ID',
    description: 'Возвращает информацию о пользователе по его уникальному ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь найден',
    type: ResponseUserDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Пользователь не найден' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя, которого нужно найти.',
  })
  async findOne(@Param('id') id: number): Promise<ResponseUserDto> {
    const user = await this.userService.findById(id);
    return plainToClass(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Создание нового пользователя',
    description: 'Создаёт нового пользователя с предоставленными данными.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Пользователь успешно создан',
    type: ResponseUserDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Неверные данные при создании пользователя.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const user = await this.userService.create(createUserDto);
    return plainToClass(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Обновление данных пользователя',
    description: 'Обновляет данные существующего пользователя по его ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь успешно обновлен',
    type: ResponseUserDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Пользователь не найден' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя, которого нужно обновить.',
  })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    const user = await this.userService.update(id, updateUserDto);
    return plainToClass(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление пользователя', description: 'Удаляет пользователя по его ID.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь успешно удалён',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Пользователь не найден' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя, которого нужно удалить.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
