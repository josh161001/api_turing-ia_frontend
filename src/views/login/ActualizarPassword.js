import React, { useEffect, useState } from "react";
import urlAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
const ActualizarPassword = () => {
  const [tokenValido, setTokenValido] = useState(null);
  const [credencialesUsuario, setCredencialesUsuario] = useState({
    password: "",
  });
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verificarToken = async () => {
      try {
        const response = await urlAxios.get(
          `/users/token-verification/${token}`
        );
        setTokenValido(true);
      } catch (error) {
        setTokenValido(false);
      }
    };

    verificarToken();
  }, [token]);

  useEffect(() => {
    if (tokenValido === false) {
      navigate("/");
    }
  }, [tokenValido, navigate]);

  const credencialesUsuarioState = (e) => {
    setCredencialesUsuario({
      ...credencialesUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const validarCredencialesUsuario = () => {
    const { password } = credencialesUsuario;
    return !password.length;
  };

  const guardarCredencialesUsuario = (e) => {
    e.preventDefault();

    urlAxios
      .patch(`/users/update-password/${token}`, credencialesUsuario)
      .then((response) => {
        Swal.fire(
          "Contraseña actualizada exitosamente",
          "Se ha actualizado la contraseña",
          "success"
        );
        navigate("/");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.message, "error");
      });
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="max-w-screen-lg bg-white rounded-md shadow-lg p-4 sm:p-12">
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
          Recupera tu cuenta en<span className="text-menta"> la App</span>
        </h1>
        <small className="text-gray-400">
          Para recuperar tu cuenta ingresa los siguientes datos
        </small>
        <form className="mt-4" onSubmit={guardarCredencialesUsuario}>
          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">
              Nueva Contraseña
            </label>
            <input
              name="password"
              type="password"
              placeholder="*******"
              className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
              onChange={credencialesUsuarioState}
            />
          </div>

          <div className="mb-3 flex gap-2">
            <button
              disabled={validarCredencialesUsuario()}
              className={`mb-1.5 block w-full text-center text-white px-3 py-1.5 rounded-md ${
                validarCredencialesUsuario() ? "bg-menta " : "bg-verde"
              }`}
            >
              Actualizar contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarPassword;
