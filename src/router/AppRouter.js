import React, { useContext } from "react";
import { AppContext, AppProvider } from "../context/AppContext";
import { Route, Routes } from "react-router-dom";
import InicioSesion from "../views/login/InicisioSesion";
import PaginaPrincipal from "../views/home/PaginaPrincipal";
import PaginaAdmin from "../views/admin/PaginaAdmin";
import PaginaDefault from "../views/login/PaginaDefault";
import MenuComida from "../views/admin/MenuComida";

export const AppRouter = () => {
  const [auth, guardarAuth] = useContext(AppContext);

  return (
    <>
      <AppProvider value={[auth, guardarAuth]}>
        <Routes>
          {/* login */}
          <Route path="/" element={<InicioSesion />} />
          <Route path="/pagina-principal" element={<PaginaPrincipal />} />
          <Route path="/admin" element={<PaginaAdmin />} />
          <Route path="/admin/menu" element={<MenuComida />} />

          <Route path="*" element={<PaginaDefault />} />
        </Routes>
      </AppProvider>
    </>
  );
};
