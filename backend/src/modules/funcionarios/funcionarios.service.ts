import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';

import { CreateFuncionarioDto } from './dto/create-funcionario.dto';

@Injectable()
export class FuncionariosService {
  constructor(private prisma: PrismaService) {}

  // RF05: Cadastrar funcionário
  async create(data: CreateFuncionarioDto) {
    return this.prisma.funcionario.create({
      data: {
        ...data,
        dataNascimento: new Date(data.dataNascimento),
      },
    });
  }

  // RF04: Consultar cadastro de funcionário
  async findAll() {
    return this.prisma.funcionario.findMany({
      select: {
        id: true,
        nome: true,
        cpf: true,
        login: true,
        nivelAcesso: true,
        ativo: true,
      },
    });
  }

  // RF01: Login do funcionário
  async login(login: string, senha: string) {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: {
        login,
      },
    });

    if (!funcionario || funcionario.senha !== senha) {
      throw new UnauthorizedException('Login ou senha inválidos');
    }

    return {
      mensagem: 'Login realizado com sucesso',
      funcionario: {
        id: funcionario.id,
        nome: funcionario.nome,
        login: funcionario.login,
        nivelAcesso: funcionario.nivelAcesso,
      },
    };
  }
}