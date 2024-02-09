import React, { useContext, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import urlAxios from "../../../config/axios";
import { AppContext } from "../../../context/AppContext";

const ModalCrearUsuario = ({ isOpen, onClose }) => {
  const roles = ["ADMIN", "USER"];
  const [auth, guardarAuth] = useContext(AppContext);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [seleccionarRol, setSeleccionarRol] = useState("");

  // Funciones y Efectos Secundarios
  const handleRolChange = (e) => {
    setSeleccionarRol(e.target.value);

    setUsuario({
      ...usuario,
      roles: [e.target.value],
    });
  };

  const usuarioState = (e) => {
    if (e.target.name === "roles") {
      setUsuario({
        ...usuario,
        roles: [e.target.value],
      });
    } else if (e.target.name === "status") {
      setUsuario({
        ...usuario,
        status: e.target.checked,
      });
    } else {
      setUsuario({
        ...usuario,
        [e.target.name]: e.target.value,
      });
    }
  };

  const validarUsuario = () => {
    const { email, name, password, roles } = usuario;

    return (
      !email.length ||
      !name.length ||
      !password.length ||
      !roles ||
      roles.length === 0
    );
  };

  const guardarUsuario = (e) => {
    e.preventDefault();

    if (auth.access_token !== "") {
      const { email, name, password, roles, status } = usuario;

      urlAxios
        .post(
          "/users",
          { email, name, password, roles: roles[0], status },
          {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          Swal.fire(
            "Usuario registrado",
            "El usuario se ha registrado correctamente",
            "success"
          );

          onClose();
        })
        .catch((error) => {
          const errorMessage = error.response.data.message;
          Swal.fire("Error", errorMessage, "error");
        });
    } else {
      navigate("/itnl/iniciar-sesion");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed mt-0 top-0 right-0 bottom-0  left-0 flex justify-center items-center w-full bg-gray-800 bg-opacity-80  z-50">
          <div className="p-4 bg-gray-800 rounded-lg max-w-xs md:max-w-3xl lg:max-w-4xl">
            <div className="flex border-b border-gray-700">
              <h2 className="text-sm text-white mb-3">Agregar Usuario</h2>
              <button
                onClick={onClose}
                className=" bg-transparent rounded-lg text-sm p-1 ml-auto text-white inline-flex items-center hover-bg-gray-600 hover-text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <form className="bg-gray-800 " onSubmit={guardarUsuario}>
              <div className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-2 gap-2 ">
                <div className="lg:mb-2">
                  <label className="block mb-2 pt-1 lg:pt-4  text-xs font-medium text-white">
                    Correo
                  </label>
                  <input
                    onChange={usuarioState}
                    name="email"
                    type="email"
                    className="border text-xs rounded-lg  block w-full pl-2.5 p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="nombre@gmail.com"
                    required
                  />
                </div>
                <div className="lg:mb-2">
                  <label className="block mb-2 pt-1 lg:pt-4  text-xs font-medium text-white">
                    Nombre
                  </label>
                  <input
                    onChange={usuarioState}
                    name="name"
                    type="text"
                    className="border  text-xs rounded-lg  block w-full pl-2.5 p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre usuario..."
                    required
                  />
                </div>

                <div className="lg:mb-2">
                  <label className="block mb-2 pt-5 lg:pt-4 text-xs font-medium text-white">
                    Contraseña
                  </label>
                  <input
                    onChange={usuarioState}
                    name="password"
                    type="password"
                    placeholder="**********"
                    className="border text-xs rounded-lg  block w-full pl-2.5 p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 pt-1 lg:pt-4 text-xs font-medium text-white">
                    Rol del usuario
                  </label>
                  <select
                    name="roles"
                    id="roles"
                    value={seleccionarRol}
                    className="border text-xs rounded-lg  block w-full p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleRolChange}
                  >
                    <option disabled value="">
                      --- Selecciona un rol ---
                    </option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block ml-2  text-xs font-medium text-white">
                    Estatus del usuario
                  </label>
                  <input
                    className="mr-2 ml-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-['']
  "
                    type="checkbox"
                    role="switch"
                    checked={usuario.status}
                    onChange={() => {
                      setUsuario({
                        ...usuario,
                        status: !usuario.status,
                      });
                    }}
                  />
                  <label
                    className={`inline-block pl-[0.15rem]  hover:cursor-pointer ${
                      usuario.status ? "text-blue-400" : "text-red-400"
                    }`}
                  >
                    {" "}
                    {usuario.status ? "Activo" : "Inactivo"}
                  </label>
                </div>
              </div>

              <button
                disabled={validarUsuario()}
                type="submit"
                className="text-white mb-4 mt-6  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 bg-blue-600 hover-bg-blue-700 focus:ring-blue-800"
              >
                Registrar usuario
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCrearUsuario;
