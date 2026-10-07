const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export type Produto = {
  id: string;
  nome: string;
  lote: string;
  codigoInterno: string;
  codigoBarras: string | null;
  precoCusto: string;
  precoVenda: string;
  impostos: string | null;
  estoqueMinimo: number;
  descricao: string | null;
  ativo: boolean;
  fornecedor: {
    razaoSocial: string;
    cnpj: string;
  };
  estoque: {
    quantidade: number;
  } | null;
};

export const produtosService = {
  async findAll(): Promise<Produto[]> {
    const response = await fetch(`${API_URL}/produtos`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar produtos (${response.status})`);
    }

    return response.json();
  },
};