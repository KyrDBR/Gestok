import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { ProdutosService } from './produtos.service';

import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ReplaceProdutoDto } from './dto/replace-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(
    private readonly produtosService: ProdutosService,
  ) {}

  @Post()
  create(
    @Body() createProdutoDto: CreateProdutoDto,
  ) {
    return this.produtosService.create(
      createProdutoDto,
    );
  }

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.produtosService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ) {
    return this.produtosService.update(
      id,
      updateProdutoDto,
    );
  }

  @Put(':id')
  replace(
    @Param('id') id: string,
    @Body() replaceProdutoDto: ReplaceProdutoDto,
  ) {
    return this.produtosService.replace(
      id,
      replaceProdutoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(id);
  }
}