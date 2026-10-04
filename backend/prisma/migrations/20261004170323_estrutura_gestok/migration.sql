/*
  Warnings:

  - You are about to alter the column `precoCusto` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `precoVenda` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `impostos` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - Added the required column `atualizadoEm` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bairro` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizadoEm` to the `Funcionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bairro` to the `Funcionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Funcionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Funcionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Funcionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Funcionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizadoEm` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoMovimentacao" AS ENUM ('ENTRADA', 'SAIDA', 'AJUSTE');

-- CreateEnum
CREATE TYPE "StatusVenda" AS ENUM ('PENDENTE', 'CONFIRMADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "FormaPagamento" AS ENUM ('DINHEIRO', 'PIX', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'BOLETO', 'TRANSFERENCIA', 'OUTRO');

-- CreateEnum
CREATE TYPE "StatusInventario" AS ENUM ('ABERTO', 'EM_CONFERENCIA', 'CONCLUIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TipoAuditoria" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'ENTRADA_ESTOQUE', 'SAIDA_ESTOQUE', 'AJUSTE_ESTOQUE', 'INVENTARIO', 'VENDA', 'CANCELAMENTO');

-- CreateEnum
CREATE TYPE "NivelAcesso" AS ENUM ('ADMIN', 'GERENTE', 'OPERADOR');

-- AlterTable
ALTER TABLE "Fornecedor" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "endereco" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Funcionario" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "endereco" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL,
ADD COLUMN     "nivelAcesso" "NivelAcesso" NOT NULL DEFAULT 'OPERADOR';

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "precoCusto" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "precoVenda" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "impostos" SET DATA TYPE DECIMAL(12,2);

-- CreateTable
CREATE TABLE "Estoque" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimentacao" (
    "id" TEXT NOT NULL,
    "tipo" "TipoMovimentacao" NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "quantidadeAnterior" INTEGER NOT NULL,
    "quantidadePosterior" INTEGER NOT NULL,
    "motivo" TEXT,
    "codigo" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "funcionarioId" TEXT NOT NULL,
    "vendaId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "complemento" TEXT,
    "cep" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venda" (
    "id" TEXT NOT NULL,
    "numeroPedido" TEXT NOT NULL,
    "dataVenda" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subtotal" DECIMAL(12,2) NOT NULL,
    "desconto" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "impostos" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(12,2) NOT NULL,
    "formaPagamento" "FormaPagamento" NOT NULL,
    "status" "StatusVenda" NOT NULL DEFAULT 'PENDENTE',
    "clienteId" TEXT NOT NULL,
    "funcionarioId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemVenda" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "precoUnitario" DECIMAL(12,2) NOT NULL,
    "subtotal" DECIMAL(12,2) NOT NULL,
    "vendaId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,

    CONSTRAINT "ItemVenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventario" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusInventario" NOT NULL DEFAULT 'ABERTO',
    "responsavelId" TEXT NOT NULL,
    "aprovadorId" TEXT,
    "observacao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemInventario" (
    "id" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "quantidadeSistema" INTEGER NOT NULL,
    "quantidadeFisica" INTEGER NOT NULL,
    "divergencia" INTEGER NOT NULL,
    "observacao" TEXT,
    "inventarioId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,

    CONSTRAINT "ItemInventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auditoria" (
    "id" TEXT NOT NULL,
    "tipo" "TipoAuditoria" NOT NULL,
    "entidade" TEXT NOT NULL,
    "entidadeId" TEXT,
    "descricao" TEXT,
    "dadosAnteriores" JSONB,
    "dadosNovos" JSONB,
    "funcionarioId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Auditoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estoque_produtoId_key" ON "Estoque"("produtoId");

-- CreateIndex
CREATE INDEX "Estoque_quantidade_idx" ON "Estoque"("quantidade");

-- CreateIndex
CREATE UNIQUE INDEX "Movimentacao_codigo_key" ON "Movimentacao"("codigo");

-- CreateIndex
CREATE INDEX "Movimentacao_produtoId_idx" ON "Movimentacao"("produtoId");

-- CreateIndex
CREATE INDEX "Movimentacao_funcionarioId_idx" ON "Movimentacao"("funcionarioId");

-- CreateIndex
CREATE INDEX "Movimentacao_tipo_idx" ON "Movimentacao"("tipo");

-- CreateIndex
CREATE INDEX "Movimentacao_criadoEm_idx" ON "Movimentacao"("criadoEm");

-- CreateIndex
CREATE INDEX "Movimentacao_vendaId_idx" ON "Movimentacao"("vendaId");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpfCnpj_key" ON "Cliente"("cpfCnpj");

-- CreateIndex
CREATE INDEX "Cliente_nome_idx" ON "Cliente"("nome");

-- CreateIndex
CREATE INDEX "Cliente_ativo_idx" ON "Cliente"("ativo");

-- CreateIndex
CREATE UNIQUE INDEX "Venda_numeroPedido_key" ON "Venda"("numeroPedido");

-- CreateIndex
CREATE INDEX "Venda_dataVenda_idx" ON "Venda"("dataVenda");

-- CreateIndex
CREATE INDEX "Venda_status_idx" ON "Venda"("status");

-- CreateIndex
CREATE INDEX "Venda_clienteId_idx" ON "Venda"("clienteId");

-- CreateIndex
CREATE INDEX "Venda_funcionarioId_idx" ON "Venda"("funcionarioId");

-- CreateIndex
CREATE INDEX "Venda_formaPagamento_idx" ON "Venda"("formaPagamento");

-- CreateIndex
CREATE INDEX "ItemVenda_vendaId_idx" ON "ItemVenda"("vendaId");

-- CreateIndex
CREATE INDEX "ItemVenda_produtoId_idx" ON "ItemVenda"("produtoId");

-- CreateIndex
CREATE INDEX "Inventario_data_idx" ON "Inventario"("data");

-- CreateIndex
CREATE INDEX "Inventario_status_idx" ON "Inventario"("status");

-- CreateIndex
CREATE INDEX "Inventario_responsavelId_idx" ON "Inventario"("responsavelId");

-- CreateIndex
CREATE INDEX "Inventario_aprovadorId_idx" ON "Inventario"("aprovadorId");

-- CreateIndex
CREATE INDEX "ItemInventario_inventarioId_idx" ON "ItemInventario"("inventarioId");

-- CreateIndex
CREATE INDEX "ItemInventario_produtoId_idx" ON "ItemInventario"("produtoId");

-- CreateIndex
CREATE INDEX "Auditoria_tipo_idx" ON "Auditoria"("tipo");

-- CreateIndex
CREATE INDEX "Auditoria_entidade_idx" ON "Auditoria"("entidade");

-- CreateIndex
CREATE INDEX "Auditoria_entidadeId_idx" ON "Auditoria"("entidadeId");

-- CreateIndex
CREATE INDEX "Auditoria_funcionarioId_idx" ON "Auditoria"("funcionarioId");

-- CreateIndex
CREATE INDEX "Auditoria_criadoEm_idx" ON "Auditoria"("criadoEm");

-- CreateIndex
CREATE INDEX "Fornecedor_razaoSocial_idx" ON "Fornecedor"("razaoSocial");

-- CreateIndex
CREATE INDEX "Fornecedor_ativo_idx" ON "Fornecedor"("ativo");

-- CreateIndex
CREATE INDEX "Funcionario_nome_idx" ON "Funcionario"("nome");

-- CreateIndex
CREATE INDEX "Funcionario_ativo_idx" ON "Funcionario"("ativo");

-- CreateIndex
CREATE INDEX "Produto_nome_idx" ON "Produto"("nome");

-- CreateIndex
CREATE INDEX "Produto_fornecedorId_idx" ON "Produto"("fornecedorId");

-- CreateIndex
CREATE INDEX "Produto_lote_idx" ON "Produto"("lote");

-- CreateIndex
CREATE INDEX "Produto_ativo_idx" ON "Produto"("ativo");

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemVenda" ADD CONSTRAINT "ItemVenda_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemVenda" ADD CONSTRAINT "ItemVenda_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_aprovadorId_fkey" FOREIGN KEY ("aprovadorId") REFERENCES "Funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInventario" ADD CONSTRAINT "ItemInventario_inventarioId_fkey" FOREIGN KEY ("inventarioId") REFERENCES "Inventario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInventario" ADD CONSTRAINT "ItemInventario_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auditoria" ADD CONSTRAINT "Auditoria_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
