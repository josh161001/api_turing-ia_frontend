import React, { useState } from "react";
import MenuHamburguesaAdmin from "../../components//layout/admin/MenuHamburguesaAdmin";

import TablaTestimonios from "../../components/layout/admin/TablaTestimonios";
import ModalCrearTestimonio from "../../components/layout/admin/ModalCrearTestimonio";

const Testimonios = () => {
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
              Aplicacion | Testimonios
            </h2>
            <button
              onClick={abrirModal}
              className="bg-blue-500 text-white px-4 py-3 hover:bg-blue-600"
            >
              Agregar testimonio
            </button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <TablaTestimonios />
          </div>
        </div>
        {modalAbierto && (
          <ModalCrearTestimonio isOpen={modalAbierto} onClose={cerrarModal} />
        )}
      </div>
    </>
  );
};

export default Testimonios;
