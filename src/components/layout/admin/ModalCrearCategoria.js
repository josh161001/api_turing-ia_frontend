import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import urlAxios from "../../../config/axios";
import { AppContext } from "../../../context/AppContext";
const ModalCrearCategoria = ({ isOpen, onClose }) => {
  const [auth, guardarAuth] = useContext(AppContext);
  const [categorias, datoCategorias] = useState([]);
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState({
    name: "",
  });

  const comidaState = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  };

  const validarCategoria = () => {
    const { name } = categoria;

    return !name.length;
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();

    if (auth.access_token !== "") {
      try {
        const { name } = categoria;

        const categoriaData = {
          name,
        };

        const respuesta = await urlAxios.post("/categories", categoriaData, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
            "Content-Type": "application/json",
          },
        });

        Swal.fire({
          icon: "success",
          title: "Categoria registrada",
          text: "La categoria se ha registrado correctamente",
        });

        onClose();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      }
    } else {
      navigate("/");
    }
  };

  const consultarCategorias = async () => {
    if (auth.access_token !== "") {
      try {
        const categoriasConsulta = await urlAxios.get("/categories", {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });
        datoCategorias(categoriasConsulta.data.categories);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    consultarCategorias();
  }, [categorias]);

  return (
    <>
      {isOpen && (
        <div className="fixed mt-0 top-0 right-0 bottom-0  left-0 flex justify-center items-center w-full bg-gray-800 bg-opacity-80  z-50">
          <div className="p-4 bg-gray-800 rounded-lg max-w-xs md:max-w-3xl lg:max-w-4xl">
            <div className="flex border-b border-gray-700">
              <h2 className="text-xs text-white mb-3">Agregar categoria</h2>

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
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l 4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <form className="bg-gray-800 " onSubmit={guardarCategoria}>
              <div className=" ">
                <div className="lg:mb-2">
                  <label className="block mb-2 pt-1 lg:pt-4 w-full text-xs font-medium text-white">
                    Nombre de la categoria
                  </label>
                  <input
                    onChange={comidaState}
                    name="name"
                    type="text"
                    className="border text-xs rounded-lg  block w-full pl-2.5 p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="categoria de..."
                  />
                </div>
              </div>

              <button
                disabled={validarCategoria()}
                type="submit"
                className="text-white bg-blue-700 mb-4 mt-6 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
              >
                Registrar categoria
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCrearCategoria;
