import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { FuncionariosController } from './funcionarios.controller';
import { FuncionariosService } from './funcionarios.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FuncionariosController],
  providers: [FuncionariosService],
})
export class FuncionariosModule {}