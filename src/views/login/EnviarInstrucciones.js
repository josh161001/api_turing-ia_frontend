import React from "react";
import FormCrearCuenta from "../../components/layout/login/FormCrearCuenta";
import FormEmail from "../../components/layout/login/FormEmail";

const EnviarInstrucciones = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="max-w-screen-lg bg-white rounded-md shadow-lg p-4 sm:p-12">
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
          Recupera tu cuenta en<span className="text-menta"> la App</span>
        </h1>
        <small className="text-gray-400">
          Para recuperar tu cuenta ingresa los siguientes datos
        </small>
        <FormEmail />
      </div>
    </div>
  );
};

export default EnviarInstrucciones;
