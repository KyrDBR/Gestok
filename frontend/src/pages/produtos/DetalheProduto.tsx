import { Link, useParams } from "react-router-dom";

export const DetalheProduto = () => {
  const { id } = useParams();

  return (
    <section>
      <Link to="/produtos" className="text-sm text-indigo-600 hover:underline">
        ← Voltar para a lista
      </Link>
      <h2 className="mt-4 text-2xl font-bold text-slate-900">Produto #{id}</h2>
    </section>
  );
};