import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { FuncionariosService } from './funcionarios.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { ReplaceFuncionarioDto } from './dto/replace-funcionario.dto';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(
    private readonly funcionariosService: FuncionariosService,
  ) {}

  @Post()
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionariosService.create(createFuncionarioDto);
  }

  @Get()
  findAll() {
    return this.funcionariosService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.funcionariosService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFuncionarioDto: UpdateFuncionarioDto,
  ) {
    return this.funcionariosService.update(
      id,
      updateFuncionarioDto,
    );
  }

  @Put(':id')
  replace(@Param('id') id: string, @Body() replaceFuncionarioDto: ReplaceFuncionarioDto,) {
  return this.funcionariosService.replace(
    id,
    replaceFuncionarioDto,
  );
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funcionariosService.remove(id);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.funcionariosService.login(
      body.login,
      body.senha,
    );
  }
}