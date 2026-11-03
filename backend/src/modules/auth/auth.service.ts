import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma/prisma.service';

import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(login: string, senha: string) {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: { login },
      select: {
        id: true,
        nome: true,
        login: true,
        senha: true,
        nivelAcesso: true,
        ativo: true,
      },
    });

    if (!funcionario || !funcionario.ativo) {
      throw new UnauthorizedException('Login ou senha inválidos');
    }

    const senhaValida = await argon2.verify(
      funcionario.senha,
      senha,
    );

    if (!senhaValida) {
      throw new UnauthorizedException('Login ou senha inválidos');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: funcionario.id,
    });

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: '8h',
      funcionario: {
        id: funcionario.id,
        nome: funcionario.nome,
        login: funcionario.login,
        nivelAcesso: funcionario.nivelAcesso,
      },
    };
  }
}