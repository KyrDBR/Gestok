import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';

import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ReplaceProdutoDto } from './dto/replace-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  // RF06: Cadastrar produto
  async create(data: CreateProdutoDto) {
    const fornecedor = await this.prisma.fornecedor.findUnique({
      where: {
        id: data.fornecedorId,
      },
    });

    if (!fornecedor) {
      throw new NotFoundException(
        'Fornecedor não encontrado',
      );
    }

    return this.prisma.produto.create({
      data: {
        nome: data.nome,
        lote: data.lote,
        codigoInterno: data.codigoInterno,
        codigoBarras: data.codigoBarras,
        precoCusto: data.precoCusto,
        precoVenda: data.precoVenda,
        impostos: data.impostos,
        estoqueMinimo: data.estoqueMinimo,
        descricao: data.descricao,
        fornecedor: {
          connect: {
            id: data.fornecedorId,
          },
        },
        estoque: {
          create: {
            quantidade: 0,
          },
        },
      },
      include: {
        fornecedor: {
          select: {
            id: true,
            razaoSocial: true,
            cnpj: true,
          },
        },
        estoque: true,
      },
    });
  }

  // Consultar todos os produtos
  async findAll() {
    return this.prisma.produto.findMany({
      orderBy: {
        nome: 'asc',
      },
      include: {
        fornecedor: {
          select: {
            id: true,
            razaoSocial: true,
            cnpj: true,
          },
        },
        estoque: true,
      },
    });
  }

  // Consultar produto por ID
  async findById(id: string) {
    const produto = await this.prisma.produto.findUnique({
      where: {
        id,
      },
      include: {
        fornecedor: {
          select: {
            id: true,
            razaoSocial: true,
            cnpj: true,
          },
        },
        estoque: true,
      },
    });

    if (!produto) {
      throw new NotFoundException(
        'Produto não encontrado',
      );
    }

    return produto;
  }

  // PATCH: atualização parcial
  async update(
    id: string,
    data: UpdateProdutoDto,
  ) {
    await this.findById(id);

    if (data.fornecedorId) {
      const fornecedor =
        await this.prisma.fornecedor.findUnique({
          where: {
            id: data.fornecedorId,
          },
        });

      if (!fornecedor) {
        throw new NotFoundException(
          'Fornecedor não encontrado',
        );
      }
    }

    const {
      fornecedorId,
      ...produtoData
    } = data;

    return this.prisma.produto.update({
      where: {
        id,
      },
      data: {
        ...produtoData,
        ...(fornecedorId
          ? {
              fornecedor: {
                connect: {
                  id: fornecedorId,
                },
              },
            }
          : {}),
      },
      include: {
        fornecedor: {
          select: {
            id: true,
            razaoSocial: true,
            cnpj: true,
          },
        },
        estoque: true,
      },
    });
  }

  // PUT: substituição completa
  async replace(
    id: string,
    data: ReplaceProdutoDto,
  ) {
    await this.findById(id);

    const fornecedor =
      await this.prisma.fornecedor.findUnique({
        where: {
          id: data.fornecedorId,
        },
      });

    if (!fornecedor) {
      throw new NotFoundException(
        'Fornecedor não encontrado',
      );
    }

    return this.prisma.produto.update({
      where: {
        id,
      },
      data: {
        nome: data.nome,
        lote: data.lote,
        codigoInterno: data.codigoInterno,
        codigoBarras: data.codigoBarras,
        precoCusto: data.precoCusto,
        precoVenda: data.precoVenda,
        impostos: data.impostos,
        estoqueMinimo: data.estoqueMinimo,
        descricao: data.descricao,
        ativo: data.ativo,
        fornecedor: {
          connect: {
            id: data.fornecedorId,
          },
        },
      },
      include: {
        fornecedor: {
          select: {
            id: true,
            razaoSocial: true,
            cnpj: true,
          },
        },
        estoque: true,
      },
    });
  }

  // DELETE
  async remove(id: string) {
    await this.findById(id);

    return this.prisma.produto.delete({
      where: {
        id,
      },
    });
  }
}