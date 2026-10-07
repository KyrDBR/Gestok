import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { produtosService, type Produto } from "../../services/produtos/GetProdutos";

const formatarPreco = (valor: string) =>
  Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const statusEstoque = (produto: Produto) => {
  const quantidade = produto.estoque?.quantidade ?? 0;

  if (quantidade === 0) {
    return { texto: "Esgotado", classe: "bg-rose-100 text-rose-700" };
  }
  if (quantidade <= produto.estoqueMinimo) {
    return { texto: `${quantidade} un. (baixo)`, classe: "bg-amber-100 text-amber-700" };
  }
  return { texto: `${quantidade} un.`, classe: "bg-emerald-100 text-emerald-700" };
};

export const ListProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    produtosService
      .findAll()
      .then(setProdutos)
      .catch((e: Error) => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-500">Carregando produtos...</p>;
  if (erro) return <p className="text-rose-600">{erro}</p>;

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Lista de Produtos
        </h2>
        <span className="text-sm text-slate-500">{produtos.length} produtos</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-3">Código</th>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Lote</th>
              <th className="px-6 py-3">Fornecedor</th>
              <th className="px-6 py-3">Preço de venda</th>
              <th className="px-6 py-3">Estoque</th>
              <th className="px-6 py-3 text-right">Ações</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {produtos.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                  Nenhum produto cadastrado.
                </td>
              </tr>
            )}

            {produtos.map((produto) => {
              const status = statusEstoque(produto);

              return (
                <tr key={produto.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">
                    {produto.codigoInterno}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{produto.nome}</td>
                  <td className="px-6 py-4 text-slate-600">{produto.lote}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {produto.fornecedor.razaoSocial}
                  </td>
                  <td className="px-6 py-4 text-slate-900">
                    {formatarPreco(produto.precoVenda)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${status.classe}`}
                    >
                      {status.texto}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/produtos/${produto.id}`}
                      className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
                    >
                      Ver produto
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};