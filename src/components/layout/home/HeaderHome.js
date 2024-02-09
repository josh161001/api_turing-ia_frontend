import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LogoPagina from "../../../assets/img/icon-page.jpg";
import { useNavigate } from "react-router-dom";

const HeaderHome = () => {
  const [menuHamburguesa, setMenuHamburguesa] = useState(false);

  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuHamburguesa(false);
  };

  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

  const scrollToServicios = () => {
    const serviciosSection = document.getElementById("servicios");
    if (serviciosSection) {
      serviciosSection.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

  const scrollToTestimonios = () => {
    const testimoniosSection = document.getElementById("testimonios");
    if (testimoniosSection) {
      testimoniosSection.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

  const cerrarSesion = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <>
      <header className="inset-x-0 z-50">
        <nav className="flex items-center justify-between bg-grisClaro p-6 lg:px-8">
          <div className="flex pl-2 lg:flex-1">
            <a
              href="/"
              className="pl-7 text-3xl font-bold text-verde -50 sm:text-3xl "
            >
              <img
                className="h-16  w-auto rounded-full"
                alt=""
                src={LogoPagina}
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-menta"
              onClick={() => setMenuHamburguesa(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 pr-4">
            <button
              className="text-sm font-semibold hover:text-azul leading-6 text-menta"
              onClick={scrollToMenu}
            >
              Menú
            </button>
            <button
              className="text-sm font-semibold hover:text-azul leading-6 text-menta"
              onClick={scrollToServicios}
            >
              Servicios
            </button>
            <button
              className="text-sm font-semibold hover:text-azul leading-6 text-menta"
              onClick={scrollToTestimonios}
            >
              Testimonios
            </button>
            <button
              className="text-sm font-semibold hover:text-azul leading-6 text-menta"
              onClick={cerrarSesion}
            >
              Cerrar Sesión
            </button>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={menuHamburguesa}
          onClose={setMenuHamburguesa}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-lg overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMenuHamburguesa(false)}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <button
                    className="block rounded-lg px-3 hover:text-menta py-2 font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={scrollToMenu}
                  >
                    Menú
                  </button>
                  <button
                    className="block rounded-lg px-3 hover:text-menta py-2 font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={scrollToServicios}
                  >
                    Servicios
                  </button>
                  <button
                    className="block rounded-lg px-3 hover:text-menta py-2 font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={scrollToTestimonios}
                  >
                    Testimonios
                  </button>
                  <button
                    className="block rounded-lg px-3 hover:text-menta py-2 font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={cerrarSesion}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default HeaderHome;
