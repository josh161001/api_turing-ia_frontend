import React, { useRef, useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import urlAxios from "../../../config/axios";

import { AppContext } from "../../../context/AppContext";
const ModalCrearcomida = ({ isOpen, onClose }) => {
  const [auth, guardarAuth] = useContext(AppContext);
  const [categorias, datoCategorias] = useState([]);
  const navigate = useNavigate();
  const [comida, setComida] = useState({
    name: "",
    description: "",
    category_Id: "",
    price: "",
  });

  const comidaState = (e) => {
    if (e.target.name === "category_Id") {
      setComida({
        ...comida,
        category_Id: e.target.value,
      });
    } else {
      setComida({
        ...comida,
        [e.target.name]: e.target.value,
      });
    }
  };

  const validarcomida = () => {
    const { name, price, category_Id, description } = comida;

    return !name.length || !description || !price || !category_Id;
  };

  const guardarComida = (e) => {
    e.preventDefault();

    if (auth.access_token !== "") {
      const { name, price, category_Id, description } = comida;

      const comidaData = {
        name,
        price: parseInt(price, 10),
        category_Id,
        description,
      };

      urlAxios
        .post(`/menu`, comidaData, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          Swal.fire(
            "Comida registrada",
            "La comida se ha registrado correctamente",
            "success"
          );
          onClose();
        })
        .catch((error) => {
          const errorMessage = error.response.data.message;
          Swal.fire("Error", errorMessage, "error");
        });
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
        if (error.response || error.response.status === 401) {
          navigate("/");
        }
      }
    } else {
      navigate("/");
    }
  };

  console.log(comida);

  useEffect(() => {
    consultarCategorias();
  }, [categorias]);

  return (
    <>
      {isOpen && (
        <div className="fixed mt-0 top-0 right-0 bottom-0  left-0 flex justify-center items-center w-full bg-gray-800 bg-opacity-80  z-50">
          <div className="p-4 bg-gray-800 rounded-lg max-w-xs md:max-w-3xl lg:max-w-4xl">
            <div className="flex border-b border-gray-700">
              <h2 className="text-xs text-white mb-3">Agregar comida</h2>

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

            <form className="bg-gray-800 " onSubmit={guardarComida}>
              <div className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-2 gap-2 ">
                <div className="lg:mb-2">
                  <label className="block mb-2 pt-1 lg:pt-4  text-xs font-medium text-white">
                    Nombre del menu
                  </label>
                  <input
                    onChange={comidaState}
                    name="name"
                    type="text"
                    className="border text-xs rounded-lg  block w-full pl-2.5 p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="comida de..."
                  />
                </div>

                <div className="lg:mb-2">
                  <label className="block mb-2 pt-1 lg:pt-4  text-xs font-medium text-white">
                    Precio del menu
                  </label>
                  <input
                    onChange={comidaState}
                    name="price"
                    type="number"
                    className="border text-xs rounded-lg  block w-full pl-2.5 p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="comida de..."
                  />
                </div>

                <div className="lg:mb-2">
                  <label className="block mb-2 pt-1 lg:pt-4 text-xs font-medium text-white">
                    Categoria del comida
                  </label>
                  <select
                    name="category_Id"
                    className="border text-xs rounded-lg  block w-full p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    onChange={comidaState}
                    value={comida.category_Id}
                  >
                    <option disabled value="">
                      Selecciona una categoria
                    </option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <label className="block mb-4 pt-2 text-xs font-medium text-white">
                    Descripcion del comida
                  </label>
                  <textarea
                    type="text"
                    onChange={comidaState}
                    name="description"
                    rows="4"
                    className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Escribe la descripcion de la comida..."
                  ></textarea>
                </div>
              </div>

              <button
                disabled={validarcomida()}
                type="submit"
                className="text-white bg-blue-700 mb-4 mt-6 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
              >
                Registrar comida
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCrearcomida;
