import { Module } from '@nestjs/common';
//import { createObserveModule } from '@nestjs/observe';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { FuncionariosModule } from './modules/funcionarios/funcionarios.module';
import { FornecedoresModule } from './modules/fornecedores/fornecedores.module';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { InventarioModule } from './modules/inventario/inventario.module';
import { VendasModule } from './modules/vendas/vendas.module';
import { RelatoriosModule } from './modules/relatorios/relatorios.module';

//export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
  DatabaseModule,
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  AuthModule,
  FuncionariosModule,
  FornecedoresModule,
  ProdutosModule,
  EstoqueModule,
  InventarioModule,
  VendasModule,
  RelatoriosModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
