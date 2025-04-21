import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityTarget } from 'typeorm';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.get<{
      entity: EntityTarget<unknown>;
      ownerField: string;
      paramId: string;
    }>('check_ownership', context.getHandler());

    if (!options) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const id = Number(request.params[options.paramId]);

    //todo: Немного не понял ТЗ, что именно имелось в виду,
    /*
    Должны проверять через Guards имеет ли право пользователь менять/удалять колонку/карточку/коммент
    (является ли владельцем этой сущности);
    */
    //todo: уточнить нет возможности(, поэтому сделал так.
    const repo = this.dataSource.getRepository(options.entity);
    const record = await repo.findOne({
      where: { id },
      relations: [options.ownerField],
    });

    if (!record) return false;

    const owner = record[options.ownerField];
    if (owner == null) return false;
    if (typeof owner === 'object' && owner.id) {
      return owner.id === user.userId;
    }

    return owner === user.userId;
  }
}
