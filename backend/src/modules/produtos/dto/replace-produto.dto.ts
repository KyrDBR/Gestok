import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ReplaceProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  lote: string;

  @IsString()
  @IsNotEmpty()
  codigoInterno: string;

  @IsOptional()
  @IsString()
  codigoBarras?: string;

  @IsNumber()
  @Min(0)
  precoCusto: number;

  @IsNumber()
  @Min(0)
  precoVenda: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  impostos?: number;

  @IsInt()
  @Min(0)
  estoqueMinimo: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsString()
  @IsNotEmpty()
  fornecedorId: string;

  @IsOptional()
  ativo?: boolean;
}