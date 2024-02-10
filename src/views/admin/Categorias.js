import React, { useState } from "react";
import MenuHamburguesaAdmin from "../../components//layout/admin/MenuHamburguesaAdmin";
import TablaCategorias from "../../components/layout/admin/TablaCategorias";
import ModalCrearCategoria from "../../components/layout/admin/ModalCrearCategoria";

const Categorias = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const abrirModal = () => {
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  return (
    <>
      <MenuHamburguesaAdmin />

      <div className="sm:ml-64">
        <div className="p-4 rounded-lg mt-12 sm:mt-12">
          <div className="flex  items-center mb-4">
            <h2 className="text-lg p-9  text-gray-900 dark:text-gray-900">
              Aplicacion | Categorias
            </h2>
            <button
              onClick={abrirModal}
              className="bg-blue-500 text-white px-4 py-3 hover:bg-blue-600"
            >
              Agregar categoria
            </button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <TablaCategorias />
          </div>
        </div>
        {modalAbierto && (
          <ModalCrearCategoria isOpen={modalAbierto} onClose={cerrarModal} />
        )}
      </div>
    </>
  );
};

export default Categorias;
