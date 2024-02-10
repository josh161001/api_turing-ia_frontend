import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
import urlAxios from "../../config/axios";

const EditarMenu = () => {
  const { id } = useParams();
  const [auth, guardarAuth] = useContext(AppContext);
  const [imagen, guardarImagen] = useState({});
  const [categorias, guardarCategorias] = useState([]);

  const navigate = useNavigate();

  const [comida, setComida] = useState({
    name: "",
    description: "",
    category_id: "",
    price: "",
  });

  const consultarComida = async () => {
    if (auth.access_token !== "") {
      try {
        const respuesta = await urlAxios.get(`/menu/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });

        setComida(respuesta.data.menu);
      } catch (error) {
        Swal.fire("Error", error.response.data.message, "error");
      }
    }
  };

  useEffect(() => {
    consultarComida();
  }, []);

  const imagenState = (e) => {
    if (e.target.name === "imagen") {
      guardarImagen({
        ...imagen,
        imagen: e.target.files[0],
      });
    }
  };

  const subirImagen = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imagen", imagen.imagen);

    try {
      const respuesta = await urlAxios.post(`/imagenes/menu/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.access_token}`,
        },
      });

      guardarImagen({});
      Swal.fire("Imagen subida", "La imagen se subió correctamente", "success");

      setTimeout(() => {
        navigate("/admin/menu");
      }, 2000);
    } catch (error) {
      Swal.fire("Error", "La imagen no puede estar sola", "error");
    }
  };

  const comidaState = (e) => {
    if (e.target.name === "category_id") {
      setComida({
        ...comida,
        category_id: e.target.value,
      });
    } else {
      setComida({
        ...comida,
        [e.target.name]: e.target.value,
      });
    }
  };
  const validarComida = () => {
    const { name, price, category_id, description } = comida;

    return !name.length || !description || !price || !category_id;
  };
  const consultarCategorias = async () => {
    if (auth.access_token !== "") {
      try {
        const respuesta = await urlAxios.get("/categories", {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });

        guardarCategorias(respuesta.data.categories);
      } catch (error) {
        Swal.fire("Error", error.response.data.message, "error");
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    consultarCategorias();
  }, [categorias]);

  const guardarComida = (e) => {
    e.preventDefault();
    const { name, price, category_id, description } = comida;

    const comidaData = {
      name,
      price: parseInt(price, 10),
      category_id: parseInt(category_id, 10),
      description,
    };

    if (auth.acces_token !== "") {
      try {
        urlAxios.patch(`/menu/${id}`, comidaData, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });

        Swal.fire({
          title: "Comida actualizado",
          text: "Se ha actualizado el comida",
          icon: "success",
        });

        setTimeout(() => {
          navigate("/admin/menu");
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
      <div className="grid lg:grid-cols-2 sm:grid-cols-1">
        <div className="flex min-h-screen items-center justify-center bg-gray-200">
          <div className="max-w-screen-lg bg-white rounded-md shadow-lg p-4 sm:p-12">
            <h1 className="text-xl sm:text-2xl font-semibold mb-2">
              Actualizar imagen en<span className="text-menta"> la App</span>
            </h1>

            <form className="" onSubmit={subirImagen}>
              <div className="flex justify-center items-center ">
                <img
                  src={comida.imagenes?.url_imagen}
                  alt="Imagen de perfil"
                  crossOrigin="anonymous"
                  className="w-full h-40 object-cover  "
                />{" "}
              </div>
              <div className="lg:mb-8">
                <label className="block mb-2 pt-1 lg:pt-4 text-xs font-medium text-verde">
                  Imagen de perfil
                </label>
                <input
                  className="w-full text-sm rounded-lg cursor-pointer text-white focus:outline-none bg-verde border-gray-600 placeholder-verde"
                  type="file"
                  onChange={imagenState}
                  name="imagen"
                />

                <div className="mt-2 text-xs text-verde">
                  Solo se permiten imágenes tipo jpg, png, jpeg, gif
                </div>
              </div>

              <div className="mb-3 flex pt-2">
                <button className="mb-1.5 block w-full text-center text-white px-3 py-1.5 rounded-md bg-verde">
                  Actualizar comida
                </button>
              </div>
            </form>
          </div>
        </div>{" "}
        <div className="flex min-h-screen items-center justify-center bg-gray-200">
          <div className="max-w-screen-lg bg-white rounded-md shadow-lg p-4 sm:p-12">
            <h1 className="text-xl sm:text-2xl font-semibold mb-2">
              Actualizar Menu en<span className="text-menta"> la App</span>
            </h1>
            <small className="text-gray-400">
              Para actualizar a los Menus ingresa los siguientes datos
            </small>
            <form className="mt-4" onSubmit={guardarComida}>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Nombre
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="nombre..."
                  value={comida.name}
                  className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
                  onChange={comidaState}
                />
              </div>

              <div className="mb-3">
                <input
                  name="price"
                  type="number"
                  placeholder="precio..."
                  value={comida.price}
                  className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
                  onChange={comidaState}
                />
              </div>
              <div className="mb-3">
                {" "}
                <div className="lg:mb-2">
                  <label className="block mb-2 pt-1 lg:pt-4 text-xs font-medium text-verde">
                    Categoria del evento
                  </label>
                  <select
                    name="category_id"
                    className="border text-xs rounded-lg  block w-full p-1.5 bg-verde border-verde placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    onChange={comidaState}
                    value={comida.category_id}
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
                <div>
                  <label className="block mb-2 pt-2 text-xs font-medium text-verde">
                    Descripcion del comida
                  </label>
                  <textarea
                    type="text"
                    onChange={comidaState}
                    name="description"
                    rows="4"
                    value={comida.description}
                    className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-verde focus:ring-verde focus:border-verde"
                    placeholder="Escribe la descripcion de la comida..."
                  ></textarea>
                </div>
              </div>

              <div className="mb-3 flex gap-2">
                <button
                  disabled={validarComida()}
                  className={`mb-1.5 block w-full text-center text-white px-3 py-1.5 rounded-md ${
                    validarComida() ? "bg-menta " : "bg-verde"
                  }`}
                >
                  Actualizar menu
                </button>
              </div>
            </form>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default EditarMenu;
