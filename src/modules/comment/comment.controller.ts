import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto, ResponseCommentDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { OwnershipGuard } from '@modules/auth';

@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), OwnershipGuard)
@Controller('users/:userId/columns/:columnId/cards/:cardId/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Создать комментарий', description: 'Создаёт новый комментарий для указанной карточки.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: ResponseCommentDto, description: 'Комментарий успешно создан.' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Body() dto: CreateCommentDto,
  ): Promise<ResponseCommentDto> {
    const comment = await this.commentService.create(dto, userId, cardId);
    return plainToClass(ResponseCommentDto, comment, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить комментарий по ID', description: 'Возвращает комментарий по его уникальному ID.' })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseCommentDto, description: 'Комментарий найден.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Комментарий не найден.' })
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseCommentDto> {
    const comment = await this.commentService.getOne(id);
    if (!comment) {
      throw new Error('Комментарий не найден');
    }
    return plainToClass(ResponseCommentDto, comment, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить комментарий', description: 'Обновляет текст комментария по его ID.' })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseCommentDto, description: 'Комментарий успешно обновлён.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Комментарий не найден.' })
  @HttpCode(HttpStatus.OK)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCommentDto): Promise<ResponseCommentDto> {
    const comment = await this.commentService.update(id, dto);
    if (!comment) {
      throw new Error('Комментарий не найден');
    }
    return plainToClass(ResponseCommentDto, comment, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление комментария', description: 'Удаляет комментарий по его ID.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Комментарий успешно удалён.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Комментарий не найден.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID комментария, который нужно удалить.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.commentService.delete(id);
  }
}
