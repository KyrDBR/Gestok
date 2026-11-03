import { SetMetadata } from '@nestjs/common';
import { NivelAcesso } from '@prisma/client';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: NivelAcesso[]) =>
  SetMetadata(ROLES_KEY, roles);