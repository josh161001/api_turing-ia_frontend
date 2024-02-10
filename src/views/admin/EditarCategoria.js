import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
import urlAxios from "../../config/axios";

const EditarCategoria = () => {
  const { id } = useParams();
  const [auth, guardarAuth] = useContext(AppContext);

  const navigate = useNavigate();

  const [categoria, setCategoria] = useState({
    name: "",
  });

  const consultarCategoria = async () => {
    if (auth.access_token !== "") {
      try {
        const respuesta = await urlAxios.get(`/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });
        setCategoria(respuesta.data.category);
      } catch (error) {
        Swal.fire("Error", error.response.data.message, "error");
      }
    }
  };

  useEffect(() => {
    consultarCategoria();
  }, []);

  const categoriaState = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  };
  const validarCategoria = () => {
    const { name } = categoria;

    return !name.length;
  };

  const guardarCategoria = (e) => {
    e.preventDefault();
    const { name } = categoria;

    const categoriaData = {
      name,
    };

    if (auth.acces_token !== "") {
      try {
        urlAxios.put(`/categories/${id}`, categoriaData, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });

        Swal.fire({
          title: "Categoria actualizado",
          text: "Se ha actualizado el categoria",
          icon: "success",
        });

        setTimeout(() => {
          navigate("/admin/categorias");
        }, 1000);
      } catch (error) {
        Swal.fire("Error", error.response.data.message, "error");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div>
        <div className="flex min-h-screen items-center justify-center bg-gray-200">
          <div className="max-w-screen-lg bg-white rounded-md shadow-lg p-4 sm:p-12">
            <h1 className="text-xl sm:text-2xl font-semibold mb-2">
              Actualizar categoria en
              <span className="text-menta"> la App</span>
            </h1>
            <small className="text-gray-400">
              Para actualizar a los testimonios ingresa los siguientes datos
            </small>
            <form className="mt-4" onSubmit={guardarCategoria}>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Nombre
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="nombre..."
                  value={categoria.name}
                  className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
                  onChange={categoriaState}
                />
              </div>

              <div className="mb-3 flex gap-2">
                <button
                  disabled={validarCategoria()}
                  className={`mb-1.5 block w-full text-center text-white px-3 py-1.5 rounded-md ${
                    validarCategoria() ? "bg-menta " : "bg-verde"
                  }`}
                >
                  Actualizar categoria
                </button>
              </div>
            </form>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default EditarCategoria;
