
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

import { FuncionariosService } from './funcionarios.service';

import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { ReplaceFuncionarioDto } from './dto/replace-funcionario.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('funcionarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FuncionariosController {
  constructor(
    private readonly funcionariosService: FuncionariosService,
  ) {}

  // Cadastrar funcionário: somente ADMIN
  @Post()
  @Roles(NivelAcesso.ADMIN)
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionariosService.create(createFuncionarioDto);
  }

  // Consultar todos: ADMIN e GERENTE
  @Get()
  @Roles(NivelAcesso.ADMIN, NivelAcesso.GERENTE)
  findAll() {
    return this.funcionariosService.findAll();
  }

  // Consultar por ID: ADMIN e GERENTE
  @Get(':id')
  @Roles(NivelAcesso.ADMIN, NivelAcesso.GERENTE)
  findById(@Param('id') id: string) {
    return this.funcionariosService.findById(id);
  }

  // Atualizar parcialmente: somente ADMIN
  @Patch(':id')
  @Roles(NivelAcesso.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateFuncionarioDto: UpdateFuncionarioDto,
  ) {
    return this.funcionariosService.update(
      id,
      updateFuncionarioDto,
    );
  }

  // Substituir cadastro: somente ADMIN
  @Put(':id')
  @Roles(NivelAcesso.ADMIN)
  replace(
    @Param('id') id: string,
    @Body() replaceFuncionarioDto: ReplaceFuncionarioDto,
  ) {
    return this.funcionariosService.replace(
      id,
      replaceFuncionarioDto,
    );
  }

  // Excluir funcionário: somente ADMIN
  @Delete(':id')
  @Roles(NivelAcesso.ADMIN)
  remove(@Param('id') id: string) {
    return this.funcionariosService.remove(id);
  }
}
