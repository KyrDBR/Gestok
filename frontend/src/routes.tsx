import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Home } from "./pages/Home/Home";
import { ListProdutos } from "./pages/produtos/ListProdutos";
import { DetalheProduto } from "./pages/produtos/DetalheProduto";

const Layout = () => (
  <>
    <Header />
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Outlet />
    </main>
  </>
);

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<ListProdutos />} />
        <Route path="/produtos/:id" element={<DetalheProduto />} />
      </Route>
    </Routes>
  </BrowserRouter>
);