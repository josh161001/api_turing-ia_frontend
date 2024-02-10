import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import urlAxios from "../../../config/axios";

const FormEmail = () => {
  //utilizar context

  //state credenciales
  const [credencialesUsuario, guardarCredencialesUsuario] = useState({
    email: "",
  });

  const navigate = useNavigate();

  //funcion para leer los datos del formulario y guardarlos en el state
  const credencialesUsuarioState = (e) => {
    guardarCredencialesUsuario({
      ...credencialesUsuario,
      [e.target.name]: e.target.value,
    });
  };

  //funcion para validar que no haya campos vacios
  const validarCredencialesUsuario = () => {
    const { email } = credencialesUsuario;
    return !email.length;
  };

  //funcion para iniciar sesion en el servidor
  const CrearCuentaUsuario = async (e) => {
    e.preventDefault();

    //validar usuario
    try {
      const respuesta = await urlAxios.post(
        "/email/send-instructions",
        credencialesUsuario
      );

      swal({
        icon: "success",
        title: "Se han enviado las instrucciones correctamente",
        text: "Verifica tu correo para continuar con la recuperación de tu contraseña",
      });

      //redirigir al usuario
      navigate("/");

      //guardar token en localstorage
    } catch (error) {
      swal({
        icon: "error",
        title: "Hubo un error",
        text: error.response.data.message,
      });
    }
  };

  return (
    <form className="mt-4" onSubmit={CrearCuentaUsuario}>
      <div className="mb-3">
        <label className="mb-2 block text-xs font-semibold">Correo</label>
        <input
          name="email"
          type="email"
          placeholder="correo@correo.com"
          className="block w-full rounded-md border border-gray-300 focus:border-menta focus:outline-none focus:ring-1 focus:ring-menta py-1 px-1.5 text-gray-500"
          onChange={credencialesUsuarioState}
        />
      </div>

      <div className="mb-3 flex flex-wrap content-center">
        <NavLink
          to="/crear-cuenta"
          className="text-xs font-semibold text-verde"
        >
          ¿No tienes cuenta?
        </NavLink>
      </div>
      <div className="mb-3 flex flex-wrap content-center">
        <NavLink to="/" className="text-xs font-semibold text-verde">
          ¿Ya tienes cuenta?
        </NavLink>
      </div>
      <div className="mb-3 flex gap-2">
        <button
          disabled={validarCredencialesUsuario()}
          className={`mb-1.5 block w-full text-center text-white px-3 py-1.5 rounded-md ${
            validarCredencialesUsuario() ? "bg-menta " : "bg-verde"
          }`}
        >
          Recuperar contraseña
        </button>
      </div>
    </form>
  );
};

export default FormEmail;
