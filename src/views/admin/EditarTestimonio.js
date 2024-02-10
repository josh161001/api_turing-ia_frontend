import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
import urlAxios from "../../config/axios";

const EditarTestimonio = () => {
  const { id } = useParams();
  const [auth, guardarAuth] = useContext(AppContext);
  const [imagen, guardarImagen] = useState({});

  const navigate = useNavigate();

  const [testimonio, setTestimonio] = useState({
    name: "",
    description: "",
  });

  const consultarTestimonio = async () => {
    if (auth.access_token !== "") {
      try {
        const respuesta = await urlAxios.get(`/testimonies/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });
        setTestimonio(respuesta.data.testimony);
      } catch (error) {
        Swal.fire("Error", error.response.data.message, "error");
      }
    }
  };

  useEffect(() => {
    consultarTestimonio();
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
      const respuesta = await urlAxios.post(
        `/imagenes/testimony/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      );

      guardarImagen({});
      Swal.fire("Imagen subida", "La imagen se subió correctamente", "success");

      setTimeout(() => {
        navigate("/admin/testimonios");
      }, 2000);
    } catch (error) {
      Swal.fire("Error", "La imagen no puede estar sola", "error");
    }
  };

  const testimonioState = (e) => {
    setTestimonio({
      ...testimonio,
      [e.target.name]: e.target.value,
    });
  };
  const validarTestimonio = () => {
    const { name, description } = testimonio;

    return !name.length || !description;
  };

  const guardarTestimonio = (e) => {
    e.preventDefault();
    const { name, description } = testimonio;

    const comidaData = {
      name,
      description,
    };

    if (auth.acces_token !== "") {
      try {
        urlAxios.patch(`/testimonies/${id}`, comidaData, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });

        Swal.fire({
          title: "Testimonio actualizado",
          text: "Se ha actualizado el testimonio",
          icon: "success",
        });

        setTimeout(() => {
          navigate("/admin/testimonios");
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
                  src={testimonio.imagenes?.url_imagen}
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
                  Actualizar testimonio
                </button>
              </div>
            </form>
          </div>
        </div>{" "}
        <div className="flex min-h-screen items-center justify-center bg-gray-200">
          <div className="max-w-screen-lg bg-white rounded-md shadow-lg p-4 sm:p-12">
            <h1 className="text-xl sm:text-2xl font-semibold mb-2">
              Actualizar testimonio en
              <span className="text-menta"> la App</span>
            </h1>
            <small className="text-gray-400">
              Para actualizar a los testimonios ingresa los siguientes datos
            </small>
            <form className="mt-4" onSubmit={guardarTestimonio}>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Nombre
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="nombre..."
                  value={testimonio.name}
                  className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
                  onChange={testimonioState}
                />
              </div>

              <div className="mb-3">
                <div>
                  <label className="block mb-2 pt-2 text-xs font-medium text-verde">
                    Descripcion del testimonio
                  </label>
                  <textarea
                    type="text"
                    onChange={testimonioState}
                    name="description"
                    rows="4"
                    value={testimonio.description}
                    className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-verde focus:ring-verde focus:border-verde"
                    placeholder="Escribe la descripcion de la testimonio..."
                  ></textarea>
                </div>
              </div>

              <div className="mb-3 flex gap-2">
                <button
                  disabled={validarTestimonio()}
                  className={`mb-1.5 block w-full text-center text-white px-3 py-1.5 rounded-md ${
                    validarTestimonio() ? "bg-menta " : "bg-verde"
                  }`}
                >
                  Actualizar testimonio
                </button>
              </div>
            </form>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default EditarTestimonio;
