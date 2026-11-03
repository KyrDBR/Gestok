import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../../../database/prisma/prisma.service';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string }): Promise<AuthenticatedUser> {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        nome: true,
        login: true,
        nivelAcesso: true,
        ativo: true,
      },
    });

    if (!funcionario || !funcionario.ativo) {
      throw new UnauthorizedException('Usuário não autorizado');
    }

    return {
      id: funcionario.id,
      nome: funcionario.nome,
      login: funcionario.login,
      nivelAcesso: funcionario.nivelAcesso,
    };
  }
}