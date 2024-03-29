import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import urlAxios from "../../../config/axios";
import { AppContext } from "../../../context/AppContext";

const FormLogin = () => {
  //utilizar context
  const [auth, guardarAuth] = useContext(AppContext);

  //state credenciales
  const [credencialesUsuario, guardarCredencialesUsuario] = useState({
    email: "",
    password: "",
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
    const { email, password } = credencialesUsuario;
    return !email.length || !password.length;
  };

  //funcion para iniciar sesion en el servidor
  const iniciarSesion = async (e) => {
    e.preventDefault();

    //validar usuario
    try {
      const respuesta = await urlAxios.post("/auth/login", credencialesUsuario);
      const { access_token, status, roles } = respuesta.data.data;

      //guardar token en localstorage
      localStorage.setItem("access_token", access_token);

      //guardar token en el state
      guardarAuth({
        access_token,
        auth: true,
      });

      swal({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: "Bienvenido a la App",
      });

      status === true
        ? roles.includes("ADMIN")
          ? navigate("/admin")
          : roles.includes("USER")
          ? navigate("/pagina-principal")
          : navigate("/pagina-principal")
        : swal("Inicio de sesión fallido", "Usuario inactivo", "error");

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
    <form className="mt-4" onSubmit={iniciarSesion}>
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
      <div className="mb-3">
        <label className="mb-2 block text-xs font-semibold">Contraseña</label>
        <input
          name="password"
          type="password"
          placeholder="*****"
          className="block w-full rounded-md border border-gray-300 focus:border-menta focus:outline-none focus:ring-1 focus:ring-menta py-1 px-1.5 text-gray-500"
          onChange={credencialesUsuarioState}
        />
      </div>
      <div className="mb-3 flex flex-wrap content-center">
        <NavLink
          to="/enviar-instrucciones"
          className="text-xs font-semibold text-verde"
        >
          ¿Olvidaste tu contraseña?
        </NavLink>
      </div>
      <div className="mb-3 flex flex-wrap content-center">
        <NavLink
          to="/crear-cuenta"
          className="text-xs font-semibold text-verde"
        >
          ¿No tienes cuenta?
        </NavLink>
      </div>
      <div className="mb-3 flex gap-2">
        <button
          disabled={validarCredencialesUsuario()}
          className={`mb-1.5 block w-full text-center text-white px-3 py-1.5 rounded-md ${
            validarCredencialesUsuario() ? "bg-menta " : "bg-verde"
          }`}
        >
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
};

export default FormLogin;
