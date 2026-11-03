import { NivelAcesso } from '@prisma/client';

export interface AuthenticatedUser {
  id: string;
  nome: string;
  login: string;
  nivelAcesso: NivelAcesso;
}