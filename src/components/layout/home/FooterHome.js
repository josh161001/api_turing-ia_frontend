import React from "react";
import { Link } from "react-router-dom";
import MenuFooter from "./MenuFooter";

const FooterHome = () => {
  return (
    <footer className="footer px-4 py-8 sm:px-10 border-t bg-verde text-black-300">
      <div className="mx-auto max-w-screen-xl sm:px-0 lg:px-8">
        <div className="grid gap-12 lg:gap-28 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Primera columna: Redes sociales */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <a href="#" className="text-menta ">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-menta ">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-menta ">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <MenuFooter />
          </div>

          {/* Segunda columna: Menú */}
          <div className="space-y-2 text-sm">
            <p className="text-menta font-bold tracking-wide">Menú</p>
            <ul className="list-none">
              <li className="mb-2">
                <Link to="#" className="text-gray-300 ">
                  Principal
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-300 ">
                  Menu
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-300 ">
                  Servicios
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-300 ">
                  Testimonios
                </Link>
              </li>
            </ul>
          </div>

          {/* Tercera columna: Contenido adicional */}
          <div className="space-y-2 text-sm">
            <p className="text-menta font-bold tracking-wide">
              Contenido Adicional
            </p>
            <ul className="list-none">
              <li className="mb-2">
                <Link to="#" className="text-gray-300 ">
                  Principal
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-300 ">
                  Menu
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-300 ">
                  Servicios
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-300 ">
                  Testimonios
                </Link>
              </li>
            </ul>
          </div>

          {/* Cuarta columna: Otro contenido */}
          <div className="space-y-2 text-sm">
            <p className="text-menta font-bold tracking-wide">
              Contenido adicional
            </p>
            <ul className="list-none">
              <li className="mb-2">
                <Link to="#" className="text-gray-300 ">
                  Principal
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-300 ">
                  Menu
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-300 ">
                  Servicios
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-300 ">
                  Testimonios
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} Jorge Michelle Martinez Estrella. Todos
            los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterHome;
