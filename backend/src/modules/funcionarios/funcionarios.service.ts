import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';

import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { ReplaceFuncionarioDto } from './dto/replace-funcionario.dto';

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

  // RF04: Consultar todos os cadastro de funcionário
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
   // Buscar funcionário por ID
  async findById(id: string) {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        cpf: true,
        dataNascimento: true,
        endereco: true,
        bairro: true,
        cidade: true,
        complemento: true,
        cep: true,
        estado: true,
        telefone: true,
        login: true,
        observacao: true,
        nivelAcesso: true,
        ativo: true,
        criadoEm: true,
        atualizadoEm: true,
      },
    });

    if (!funcionario) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    return funcionario;
  }

  // Atualizar funcionário
  async update(id: string, data: UpdateFuncionarioDto) {
    await this.findById(id);

    const updateData = {
      ...data,
      ...(data.dataNascimento
        ? {
            dataNascimento: new Date(data.dataNascimento),
          }
        : {}),
    };

    return this.prisma.funcionario.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        nome: true,
        cpf: true,
        dataNascimento: true,
        endereco: true,
        bairro: true,
        cidade: true,
        complemento: true,
        cep: true,
        estado: true,
        telefone: true,
        login: true,
        observacao: true,
        nivelAcesso: true,
        ativo: true,
        criadoEm: true,
        atualizadoEm: true,
      },
    });
  }

  // Substituir funcionário
async replace(id: string, data: ReplaceFuncionarioDto) {
  await this.findById(id);

  return this.prisma.funcionario.update({where: { id }, data: {...data, dataNascimento: new Date(data.dataNascimento),},
      select: {
        id: true,
        nome: true,
        cpf: true,
        dataNascimento: true,
        endereco: true,
        bairro: true,
        cidade: true,
        complemento: true,
        cep: true,
        estado: true,
        telefone: true,
        login: true,
        observacao: true,
        nivelAcesso: true,
        ativo: true,
        criadoEm: true,
        atualizadoEm: true,
      },
    });
  }

  // Excluir funcionário
  async remove(id: string) {
    await this.findById(id);

    return this.prisma.funcionario.delete({
      where: { id },
      select: {
        id: true,
        nome: true,
        cpf: true,
        login: true,
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