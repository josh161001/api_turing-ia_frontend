import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
import urlAxios from "../../config/axios";

const EditarUsuario = () => {
  const { id } = useParams();
  const [auth, guardarAuth] = useContext(AppContext);
  const [imagen, guardarImagen] = useState({});

  const roles = ["ADMIN", "USER"];

  const navigate = useNavigate();

  const [usuario, datoUsuario] = useState({
    name: "",
    email: "",
    status: false,
    roles: [],
  });

  const [seleccionarRol, setSeleccionarRol] = useState(usuario.roles[0]);

  const cambiarRol = (e) => {
    setSeleccionarRol(e.target.value);

    datoUsuario({
      ...usuario,
      roles: [e.target.value],
    });
  };

  useEffect(() => {
    setSeleccionarRol(usuario.roles[0]);
  }, [usuario.roles]);

  const consultarUsuario = async () => {
    if (auth.access_token !== "") {
      try {
        const respuesta = await urlAxios.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });

        datoUsuario(respuesta.data.data);
      } catch (error) {
        Swal.fire("Error", error.response.data.message, "error");
      }
    }
  };

  useEffect(() => {
    consultarUsuario();
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
      const respuesta = await urlAxios.post(`/imagenes/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.access_token}`,
        },
      });

      guardarImagen({});
      Swal.fire("Imagen subida", "La imagen se subió correctamente", "success");

      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      Swal.fire("Error", "La imagen no puede estar sola", "error");
    }
  };

  const usuarioState = (e) => {
    if (e.target.name !== "roles") {
      datoUsuario({
        ...usuario,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "status") {
      datoUsuario({
        ...usuario,
        status: e.target.checked,
      });
    } else {
      datoUsuario({
        ...usuario,
        [e.target.name]: e.target.value,
      });
    }
  };

  const validarUsuario = () => {
    const { email, name, roles } = usuario;

    return !email.length || !name.length || !roles.length;
  };

  const cambiarStatus = () => {
    datoUsuario((statusPrevio) => ({
      ...statusPrevio,
      status: !statusPrevio.status,
    }));
  };

  const guardarUsuario = (e) => {
    e.preventDefault();

    if (auth.acces_token !== "") {
      try {
        urlAxios.patch(`/users/${id}`, usuario, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });

        Swal.fire({
          title: "Usuario actualizado",
          text: "Se ha actualizado el usuario",
          icon: "success",
        });

        setTimeout(() => {
          navigate("/admin");
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
                  src={usuario.imagenes?.url_imagen}
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
                  Actualizar usuario
                </button>
              </div>
            </form>
          </div>
        </div>{" "}
        <div className="flex min-h-screen items-center justify-center bg-gray-200">
          <div className="max-w-screen-lg bg-white rounded-md shadow-lg p-4 sm:p-12">
            <h1 className="text-xl sm:text-2xl font-semibold mb-2">
              Actualizar usuarios en<span className="text-menta"> la App</span>
            </h1>
            <small className="text-gray-400">
              Para actualizar a los usuarios ingresa los siguientes datos
            </small>
            <form className="mt-4" onSubmit={guardarUsuario}>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Nombre
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="nombre..."
                  value={usuario.name}
                  className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
                  onChange={usuarioState}
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email..."
                  disabled
                  value={usuario.email}
                  className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
                  onChange={usuarioState}
                />
              </div>
              <div className="mb-3">
                <div>
                  <label className="block mb-2 pt-1 lg:pt-4 text-xs font-medium text-verde">
                    Rol del usuario
                  </label>
                  <select
                    name="roles"
                    id="roles"
                    value={seleccionarRol}
                    className="border text-xs rounded-lg  block w-full p-1.5 bg-verde border-verde placeholder-gray-400 text-white focus:ring-blue-500 focus:border-verde"
                    onChange={cambiarRol}
                  >
                    <option disabled selected>
                      --- Selecciona un rol ---
                    </option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <div>
                  <label className="block ml-2 mt-4  text-xs font-medium text-verde">
                    Estatus del usuario
                  </label>
                  <input
                    className="mr-2 ml-2 mt-[0.3rem] h-3.5 w-8
                     appearance-none rounded-[0.4375rem] bg-neutral-300 
                     before:pointer-events-none before:absolute 
                     before:h-3.5 before:w-3.5 before:rounded-full 
                     before:bg-transparent before:content-[''] 
                     after:absolute after:z-[2] after:-mt-[0.1875rem] 
                     after:h-5 after:w-5 after:rounded-full after:border-none
                      after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-['']
  "
                    type="checkbox"
                    role="switch"
                    checked={usuario.status}
                    onChange={cambiarStatus}
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

              <div className="mb-3 flex gap-2">
                <button
                  disabled={validarUsuario()}
                  className={`mb-1.5 block w-full text-center text-white px-3 py-1.5 rounded-md ${
                    validarUsuario() ? "bg-menta " : "bg-verde"
                  }`}
                >
                  Actualizar usuario
                </button>
              </div>
            </form>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default EditarUsuario;
