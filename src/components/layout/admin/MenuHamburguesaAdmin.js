import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

import CerrarSesion from "../../common/CerrarSesion";
import MenuCategoriasDrop from "../../common/MenuCategoriasDrop";
import MenuUsuariosDrop from "../../common/MenuUsuariosDrop";

import MenuComida from "../../common/MenuComidaDrop";
import MenuTestimoniosDrop from "../../common/MenuTestimoniosDrop";

const MenuHamburguesaAdmin = () => {
  const usuariosDrop = [{ name: "Ver Usuarios", to: "/admin" }];
  const menuComidaDrop = [{ name: "Ver Menu", to: "/admin/menu" }];
  const categoriasDrop = [{ name: "Ver categorias", to: "/admin/categorias" }];
  const testimoniosDrop = [
    { name: "Ver testimonios", to: "/admin/testimonios" },
  ];

  const [menuHamburguesa, setMenuHamburguesa] = useState(false);
  const toggleMenuHamburguesa = () => {
    setMenuHamburguesa(!menuHamburguesa);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full  border-b border-gray-800 bg-gray-800 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                className="-m-2.5 pl-4 inline-flex sm:hidden items-center justify-center rounded-md p-2.5 text-stone-50"
                aria-expanded={menuHamburguesa}
                onClick={toggleMenuHamburguesa}
              >
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex pl-4 sm:pl-8 md:mr-24">
                <span className="self-center text-1xl pt-2  font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className={`fixed ${
          menuHamburguesa
            ? "translate-x-0 ease-out"
            : "-translate-x-full ease-in"
        } top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <MenuUsuariosDrop name="Usuarios" options={usuariosDrop} />
            <MenuComida name="Menu" options={menuComidaDrop} />
            <MenuCategoriasDrop name="Categorias" options={categoriasDrop} />
            <MenuTestimoniosDrop name="Testimonios" options={testimoniosDrop} />
            <CerrarSesion />
          </ul>
        </div>
      </aside>
    </>
  );
};

export default MenuHamburguesaAdmin;
