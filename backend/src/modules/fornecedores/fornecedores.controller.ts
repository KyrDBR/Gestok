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

import { FornecedoresService } from './fornecedores.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { ReplaceFornecedorDto } from './dto/replace-fornecedor.dto';

@Controller('fornecedores')
export class FornecedoresController {
  constructor(
    private readonly fornecedoresService: FornecedoresService,
  ) {}

  @Post()
  create(@Body() createFornecedorDto: CreateFornecedorDto) {
    return this.fornecedoresService.create(createFornecedorDto);
  }

  @Get()
  findAll() {
    return this.fornecedoresService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.fornecedoresService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFornecedorDto: UpdateFornecedorDto,
  ) {
    return this.fornecedoresService.update(
      id,
      updateFornecedorDto,
    );
  }

    @Put(':id')
    replace(@Param('id') id: string, @Body() replaceFornecedorDto: ReplaceFornecedorDto,) {
      return this.fornecedoresService.replace(
        id,
        replaceFornecedorDto,
      );
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fornecedoresService.remove(id);
  }
}