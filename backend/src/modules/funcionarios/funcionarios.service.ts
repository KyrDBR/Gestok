import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import * as argon2 from 'argon2';
import { PrismaService } from '../../database/prisma/prisma.service';

import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { ReplaceFuncionarioDto } from './dto/replace-funcionario.dto';

@Injectable()
export class FuncionariosService {
  constructor(private prisma: PrismaService) {}

  // RF05: Cadastrar funcionário
 async create(data: CreateFuncionarioDto) {
  const senhaHash = await argon2.hash(data.senha, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  return this.prisma.funcionario.create({
    data: {
      ...data,
      senha: senhaHash,
      dataNascimento: new Date(data.dataNascimento),
    },

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

  const { senha, dataNascimento, ...dados } = data;

  const dadosAtualizacao = {
    ...dados,

    ...(dataNascimento
      ? { dataNascimento: new Date(dataNascimento) }
      : {}),

    ...(senha
      ? {
          senha: await argon2.hash(senha, {
            type: argon2.argon2id,
            memoryCost: 19456,
            timeCost: 2,
            parallelism: 1,
          }),
        }
      : {}),
  };

  return this.prisma.funcionario.update({
    where: { id },
    data: dadosAtualizacao,

      select: {
        id: true,
        nome: true,
        cpf: true,
        login: true,
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

}