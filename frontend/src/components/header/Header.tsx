import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
    isActive
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <span className="text-xl font-bold tracking-tight text-slate-900">
          Gesto<span className="text-indigo-600">K</span>
        </span>

        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/produtos" className={linkClass}>
            Produtos
          </NavLink>
        </nav>
      </div>
    </header>
  );
};