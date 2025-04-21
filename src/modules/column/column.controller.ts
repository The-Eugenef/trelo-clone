import { Controller, Get, Post, Param, Body, Patch, Delete, ParseIntPipe, UseGuards, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ColumnService } from './column.service';
import { CreateColumnDto, UpdateColumnDto } from './dto';
import { CheckOwnership } from '@modules/auth/check-ownership.decorator';
import { OwnershipGuard } from '@modules/auth/auth.guard';
import { ColumnEntity } from '@entities';
import { AuthGuard } from '@nestjs/passport';
import { ResponseColumnDto } from './dto/response-column.dto';
import { plainToClass } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';

@ApiTags('Columns')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), OwnershipGuard)
@Controller('users/:userId/columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить все колонки пользователя',
    description: 'Возвращает список всех колонок пользователя, идентифицируемого по его userId.',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID пользователя для получения колонок',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список колонок для данного пользователя',
    type: [ResponseColumnDto],
  })
  getAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.columnService.getAllByUser(userId);
  }

  @Post()
  @ApiOperation({
    summary: 'Создать колонку для пользователя',
    description: 'Создает новую колонку для пользователя с переданным userId.',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID пользователя для создания новой колонки',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Колонка успешно создана',
    type: ResponseColumnDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Param('userId', ParseIntPipe) userId: number, @Body() dto: CreateColumnDto) {
    const column = await this.columnService.create(userId, dto);
    return plainToClass(ResponseColumnDto, column, {
      excludeExtraneousValues: true,
    });
  }

  @CheckOwnership(ColumnEntity)
  @Get(':id')
  @ApiOperation({
    summary: 'Получить колонку по ID у пользователя',
    description: 'Получает колонку по её ID для пользователя, проверяется, что пользователь владеет данной колонкой.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Информация о колонке пользователя',
    type: ResponseColumnDto,
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID пользователя, которому принадлежит колонка',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID колонки, которую необходимо получить',
  })
  async getOne(@Param('userId', ParseIntPipe) userId: number, @Param('id', ParseIntPipe) id: number) {
    const column = await this.columnService.getOne(userId, id);
    return plainToClass(ResponseColumnDto, column, {
      excludeExtraneousValues: true,
    });
  }

  @CheckOwnership(ColumnEntity)
  @Patch(':id')
  @ApiOperation({
    summary: 'Обновить колонку пользователя',
    description:
      'Обновляет информацию о колонке для пользователя по ID. Требуется, чтобы пользователь был владельцем колонки.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Колонка успешно обновлена',
    type: ResponseColumnDto,
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID пользователя, которому принадлежит колонка',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID колонки, которую нужно обновить',
  })
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateColumnDto,
  ) {
    const column = await this.columnService.update(userId, id, dto);
    return plainToClass(ResponseColumnDto, column, {
      excludeExtraneousValues: true,
    });
  }

  @CheckOwnership(ColumnEntity)
  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить колонку пользователя',
    description: 'Удаляет колонку пользователя по её ID. Требуется, чтобы пользователь был владельцем колонки.',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Колонка успешно удалена',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID пользователя, которому принадлежит колонка',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID колонки, которую необходимо удалить',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('userId', ParseIntPipe) userId: number, @Param('id', ParseIntPipe) id: number) {
    return await this.columnService.delete(userId, id);
  }
}
