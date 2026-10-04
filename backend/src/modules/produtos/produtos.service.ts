import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  // RF06: Consultar produtos
  async findAll() {
    return this.prisma.produto.findMany({
      include: {
        fornecedor: {
          select: { razaoSocial: true, cnpj: true } // Traz dados do fornecedor junto com o produto
        }
      }
    });
  }
}