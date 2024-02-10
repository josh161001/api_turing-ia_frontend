import { useContext, useEffect, useState } from "react";
import urlAxios from "../../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import Swal from "sweetalert2";

const TablaCategorias = (props) => {
  const [auth, guardarAuth] = useContext(AppContext);

  const [categoria, guardarCategoria] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [usuarioPorPagina] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.access_token !== "") {
      const consultarCategoria = async () => {
        try {
          const respuesta = await urlAxios.get("/categories", {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            },
          });

          guardarCategoria(respuesta.data.categories);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Hubo un error",
            text: error.response.data.error,
          });
        }
      };
      consultarCategoria();
    } else {
      navigate("/");
    }
  }, [auth.access_token, navigate, categoria]);

  const eliminarCategoria = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Ya no se podrá recuperar el categoria",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        urlAxios.delete(`/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });
      }
    });
  };

  const indexDeUltimoUsuario = paginaActual * usuarioPorPagina;
  const indexDelPrimerUsuario = indexDeUltimoUsuario - usuarioPorPagina;
  const comidaActual = categoria.slice(
    indexDelPrimerUsuario,
    indexDeUltimoUsuario
  );

  const totalPaginas = Math.ceil(categoria.length / usuarioPorPagina);

  const pagina = (numeroDePagina) => {
    if (numeroDePagina >= 1 && numeroDePagina <= totalPaginas) {
      setPaginaActual(numeroDePagina);
    }
  };

  return (
    <>
      <div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4"></th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>

              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {comidaActual.map((categoria, index) => (
              <tr
                key={categoria.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4"></td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {categoria.name}
                </td>

                <td className=" items-center flex pt-7 px-4 py-4 space-x-3">
                  {/* editar */}
                  <Link
                    to={`/admin/categoria/${categoria.id}`}
                    className="inline-block px-1 py-1 rounded-lg bg-blue-900  font-medium text-red-600 dark:text-blue-500 hover:underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                      <path
                        fillRule="evenodd"
                        d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  {/* eliminar */}

                  <button
                    onClick={() => eliminarCategoria(categoria.id)}
                    className="inline-block px-1 py-1 rounded-lg bg-red-900 font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Paginación */}
      <div className="flex items-center justify-center mb-2 mt-3">
        {Array.from({ length: totalPaginas }).map((_, index) => (
          <button
            key={index}
            onClick={() => pagina(index + 1)}
            className={`px-3 py-2 ${
              paginaActual === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } mx-1 rounded`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default TablaCategorias;
