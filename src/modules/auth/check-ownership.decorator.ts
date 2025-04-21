import { SetMetadata } from '@nestjs/common';
import { EntityTarget } from 'typeorm';

export const CHECK_OWNERSHIP_KEY = 'check_ownership';

export const CheckOwnership = (entity: EntityTarget<unknown>, options?: { ownerField?: string; paramId?: string }) =>
  SetMetadata(CHECK_OWNERSHIP_KEY, {
    entity,
    ownerField: options?.ownerField || 'user',
    paramId: options?.paramId || 'id',
  });
