import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ResponseCardDto } from './dto/response-card.dto';
import { CheckOwnership, OwnershipGuard } from '@modules/auth';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CardEntity } from '@entities';
import { plainToClass } from 'class-transformer';

@ApiTags('Cards')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), OwnershipGuard)
@Controller('users/:userId/columns/:columnId/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiOperation({
    summary: 'Создать карточку',
    description: 'Создает новую карточку в указанной колонке пользователя.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ResponseCardDto,
    description: 'Карточка успешно создана.',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID пользователя, к которому принадлежит карточка.',
  })
  @ApiParam({
    name: 'columnId',
    type: Number,
    description: 'ID колонки, в которой будет размещена карточка.',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Body() dto: CreateCardDto,
  ): Promise<ResponseCardDto> {
    const card = await this.cardService.create(userId, columnId, dto);
    return plainToClass(ResponseCardDto, card, {
      excludeExtraneousValues: true,
    });
  }

  @CheckOwnership(CardEntity)
  @Patch(':id')
  @ApiOperation({
    summary: 'Обновить карточку',
    description: 'Обновляет существующую карточку в указанной колонке.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseCardDto,
    description: 'Карточка успешно обновлена.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID карточки, которую необходимо обновить.',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID пользователя, которому принадлежит обновляемая карточка.',
  })
  @ApiParam({
    name: 'columnId',
    type: Number,
    description: 'ID колонки, в которой находится карточка.',
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Param('columnId') columnId: number,
    @Body() dto: UpdateCardDto,
  ): Promise<ResponseCardDto> {
    const card = await this.cardService.update(id, columnId, dto);
    return plainToClass(ResponseCardDto, card, {
      excludeExtraneousValues: true,
    });
  }

  @CheckOwnership(CardEntity)
  @Get(':id')
  @ApiOperation({
    summary: 'Получить карточку',
    description: 'Возвращает подробную информацию о карточке.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseCardDto,
    description: 'Детали карточки успешно получены.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID карточки, информацию о которой необходимо получить.',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID пользователя, которому принадлежит карточка.',
  })
  @ApiParam({
    name: 'columnId',
    type: Number,
    description: 'ID колонки, в которой находится карточка.',
  })
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: number): Promise<ResponseCardDto> {
    const card = await this.cardService.getOne(id);
    return plainToClass(ResponseCardDto, card, {
      excludeExtraneousValues: true,
    });
  }

  @CheckOwnership(CardEntity)
  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить карточку',
    description: 'Удаляет карточку из указанной колонки.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Карточка успешно удалена.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID карточки, которую нужно удалить.',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID пользователя, которому принадлежит удаляемая карточка.',
  })
  @ApiParam({
    name: 'columnId',
    type: Number,
    description: 'ID колонки, в которой находится карточка.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.cardService.delete(id);
  }
}
