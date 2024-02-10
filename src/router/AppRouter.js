import React, { useContext } from "react";
import { AppContext, AppProvider } from "../context/AppContext";
import { Route, Routes } from "react-router-dom";
import InicioSesion from "../views/login/InicisioSesion";
import PaginaPrincipal from "../views/home/PaginaPrincipal";
import PaginaAdmin from "../views/admin/PaginaAdmin";
import PaginaDefault from "../views/login/PaginaDefault";
import MenuComida from "../views/admin/MenuComida";
import EnviarInstrucciones from "../views/login/EnviarInstrucciones";
import CrearCuenta from "../views/login/CrearCuenta";
import ActualizarPassword from "../views/login/ActualizarPassword";
import VerificarCuenta from "../views/login/VerificarCuenta";
import Categorias from "../views/admin/Categorias";
import Testimonios from "../views/admin/Testimonios";
import EditarUsuario from "../views/admin/EditarUsuario";
import EditarCategoria from "../views/admin/EditarCategoria";
import EditarMenu from "../views/admin/EditarMenu";
import EditarTestimonio from "../views/admin/EditarTestimonio";

export const AppRouter = () => {
  const [auth, guardarAuth] = useContext(AppContext);

  return (
    <>
      <AppProvider value={[auth, guardarAuth]}>
        <Routes>
          {/* login */}
          <Route path="/" element={<InicioSesion />} />
          <Route
            path="/enviar-instrucciones"
            element={<EnviarInstrucciones />}
          />
          <Route
            path="/recuperar-cuenta/:token"
            element={<ActualizarPassword />}
          />
          <Route
            path="/verificar-cuenta/:token"
            element={<VerificarCuenta />}
          />
          <Route path="/crear-cuenta" element={<CrearCuenta />} />

          {/* home */}
          <Route path="/pagina-principal" element={<PaginaPrincipal />} />

          {/* admin */}
          <Route path="/admin" element={<PaginaAdmin />} />
          <Route path="/admin/:id" element={<EditarUsuario />} />
          <Route path="/admin/menu" element={<MenuComida />} />
          <Route path="/admin/menu/:id" element={<EditarMenu />} />
          <Route path="/admin/categorias" element={<Categorias />} />
          <Route path="/admin/categoria/:id" element={<EditarCategoria />} />
          <Route path="/admin/testimonios" element={<Testimonios />} />
          <Route path="/admin/testimonio/:id" element={<EditarTestimonio />} />

          <Route path="*" element={<PaginaDefault />} />
        </Routes>
      </AppProvider>
    </>
  );
};
