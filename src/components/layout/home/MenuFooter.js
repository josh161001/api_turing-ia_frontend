import React from "react";
import { Link } from "react-router-dom";

const MenuFooter = () => {
  return (
    <ul className="list-none flex flex-row">
      <li className="mr-4">
        <Link to="/tecnl/pagina-principal" className="text-menta ">
          Principal
        </Link>
      </li>
      <li className="mr-4">
        <Link to="/tecnl/eventos" className="text-menta ">
          Menu
        </Link>
      </li>
      <li className="mr-4">
        <Link to="/tecnl/grupos" className="text-menta ">
          Servicios
        </Link>
      </li>
      <li>
        <Link to="/tecnl/noticias" className="text-menta ">
          Testimonios
        </Link>
      </li>
    </ul>
  );
};

export default MenuFooter;
