
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

import { FornecedoresService } from './fornecedores.service';

import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { ReplaceFornecedorDto } from './dto/replace-fornecedor.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('fornecedores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FornecedoresController {
  constructor(
    private readonly fornecedoresService: FornecedoresService,
  ) {}

  // Cadastrar fornecedor: ADMIN e GERENTE
  @Post()
  @Roles(NivelAcesso.ADMIN, NivelAcesso.GERENTE)
  create(@Body() createFornecedorDto: CreateFornecedorDto) {
    return this.fornecedoresService.create(createFornecedorDto);
  }

  // Consultar todos: todos os perfis
  @Get()
  @Roles(
    NivelAcesso.ADMIN,
    NivelAcesso.GERENTE,
    NivelAcesso.OPERADOR,
  )
  findAll() {
    return this.fornecedoresService.findAll();
  }

  // Consultar por ID: todos os perfis
  @Get(':id')
  @Roles(
    NivelAcesso.ADMIN,
    NivelAcesso.GERENTE,
    NivelAcesso.OPERADOR,
  )
  findById(@Param('id') id: string) {
    return this.fornecedoresService.findById(id);
  }

  // Atualizar parcialmente: ADMIN e GERENTE
  @Patch(':id')
  @Roles(NivelAcesso.ADMIN, NivelAcesso.GERENTE)
  update(
    @Param('id') id: string,
    @Body() updateFornecedorDto: UpdateFornecedorDto,
  ) {
    return this.fornecedoresService.update(
      id,
      updateFornecedorDto,
    );
  }

  // Substituir cadastro: ADMIN e GERENTE
  @Put(':id')
  @Roles(NivelAcesso.ADMIN, NivelAcesso.GERENTE)
  replace(
    @Param('id') id: string,
    @Body() replaceFornecedorDto: ReplaceFornecedorDto,
  ) {
    return this.fornecedoresService.replace(
      id,
      replaceFornecedorDto,
    );
  }

  // Excluir fornecedor: somente ADMIN
  @Delete(':id')
  @Roles(NivelAcesso.ADMIN)
  remove(@Param('id') id: string) {
    return this.fornecedoresService.remove(id);
  }
}
