
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { NivelAcesso } from '@prisma/client';

import { ProdutosService } from './produtos.service';

import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ReplaceProdutoDto } from './dto/replace-produto.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('produtos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProdutosController {
  constructor(
    private readonly produtosService: ProdutosService,
  ) {}

  // Cadastrar produto: ADMIN e GERENTE
  @Post()
  @Roles(NivelAcesso.ADMIN, NivelAcesso.GERENTE)
  create(@Body() dto: CreateProdutoDto) {
    return this.produtosService.create(dto);
  }

  // Consultar todos: todos os perfis
  @Get()
  @Roles(
    NivelAcesso.ADMIN,
    NivelAcesso.GERENTE,
    NivelAcesso.OPERADOR,
  )
  findAll() {
    return this.produtosService.findAll();
  }

  // Consultar por ID: todos os perfis
  @Get(':id')
  @Roles(
    NivelAcesso.ADMIN,
    NivelAcesso.GERENTE,
    NivelAcesso.OPERADOR,
  )
  findById(@Param('id') id: string) {
    return this.produtosService.findById(id);
  }

  // Atualizar parcialmente: ADMIN e GERENTE
  @Patch(':id')
  @Roles(NivelAcesso.ADMIN, NivelAcesso.GERENTE)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProdutoDto,
  ) {
    return this.produtosService.update(id, dto);
  }

  // Substituir cadastro: ADMIN e GERENTE
  @Put(':id')
  @Roles(NivelAcesso.ADMIN, NivelAcesso.GERENTE)
  replace(
    @Param('id') id: string,
    @Body() dto: ReplaceProdutoDto,
  ) {
    return this.produtosService.replace(id, dto);
  }

  // Excluir produto: somente ADMIN
  @Delete(':id')
  @Roles(NivelAcesso.ADMIN)
  remove(@Param('id') id: string) {
    return this.produtosService.remove(id);
  }
}
