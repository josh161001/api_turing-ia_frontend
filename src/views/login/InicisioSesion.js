import React from "react";
import FormLogin from "../../components/layout/login/FormLogin";

const InicioSesion = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="max-w-screen-lg bg-white rounded-md shadow-lg p-4 sm:p-12">
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
          Bienvenido a <span className="text-azul">la App</span>
        </h1>
        <small className="text-gray-400">
          Bienvenido de vuelta, inicia sesión con tu cuenta
        </small>
        <FormLogin />
      </div>
    </div>
  );
};

export default InicioSesion;
