import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}