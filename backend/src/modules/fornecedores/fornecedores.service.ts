import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';

@Injectable()
export class FornecedoresService {
  constructor(private prisma: PrismaService) {}

  // RF03: Cadastrar fornecedor
  async create(data: CreateFornecedorDto) {
    return this.prisma.fornecedor.create({
      data,
    });
  }

  // RF02: Consultar cadastro de fornecedor
  async findAll() {
    return this.prisma.fornecedor.findMany({
      orderBy: {
        razaoSocial: 'asc',
      },
    });
  }
}