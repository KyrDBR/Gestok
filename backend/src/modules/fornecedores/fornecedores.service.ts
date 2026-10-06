import { Injectable,  NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { ReplaceFornecedorDto } from './dto/replace-fornecedor.dto';

@Injectable()
export class FornecedoresService {
  constructor(private prisma: PrismaService) {}

  // RF03: Cadastrar fornecedor
  async create(data: CreateFornecedorDto) {
    return this.prisma.fornecedor.create({
      data,
    });
  }

  // RF02: Consultar todos os fornecedores
  async findAll() {
    return this.prisma.fornecedor.findMany({
      orderBy: {
        razaoSocial: 'asc',
      },
    });
  }
   // Buscar fornecedor por ID
  async findById(id: string) {
    const fornecedor = await this.prisma.fornecedor.findUnique({
      where: { id },
    });

    if (!fornecedor) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    return fornecedor;
  }

  // Atualizar fornecedor
  async update(id: string, data: UpdateFornecedorDto) {
    await this.findById(id);

    return this.prisma.fornecedor.update({
      where: { id },
      data,
    });
  }

  // Substituir fornecedor
  async replace(id: string, data: ReplaceFornecedorDto) {
    await this.findById(id);

    return this.prisma.fornecedor.update({
      where: { id },
      data,
    });
  }

  // Excluir fornecedor
  async remove(id: string) {
    await this.findById(id);

    return this.prisma.fornecedor.delete({
      where: { id },
    });
  }
}