import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { FornecedoresController } from './fornecedores.controller';
import { FornecedoresService } from './fornecedores.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FornecedoresController],
  providers: [FornecedoresService],
})
export class FornecedoresModule {}