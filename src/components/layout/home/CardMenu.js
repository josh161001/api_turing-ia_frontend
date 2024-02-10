import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import urlAxios from "../../../config/axios";
import moment from "moment";
import "moment/locale/es";

const CardMenu = () => {
  const [auth, guardarAuth] = useContext(AppContext);
  const [comida, guardarComida] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const consultarMenu = async () => {
      if (auth.access_token !== "") {
        const menu = await urlAxios.get("/menu", {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });

        const menuCategoria = menu.data.menu.reduce((categorias, menu) => {
          const categoria = menu.categories?.name;
          console.log(menu.categories?.name);

          console.log(categoria);
          if (!categorias[categoria]) {
            categorias[categoria] = [];
          }

          categorias[categoria].push(menu);
          return categorias;
        }, {});

        guardarComida(menuCategoria);
      } else {
        navigate("/");
      }
    };
    consultarMenu();
  }, [auth.access_token, navigate]);

  const categorias = [
    ...new Set(
      Object.values(comida)
        .flat()
        .map((comida) => comida.categories?.name)
    ),
  ];

  const comidaFiltrada = Object.values(comida)
    .flat()
    .filter(
      (comida) =>
        (comida.categories?.name.includes(filtroCategoria) ||
          filtroCategoria === "") &&
        (comida.name.includes(filtroNombre) || filtroNombre === "")
    );

  return (
    <>
      <div className="flex flex-col  mr-10 ml-10 lg:flex-row justify-center p-2 gap-2 mt-2">
        <div className="p-2">
          <input
            className="p-2 w-full rounded border focus:ring-azul border-grayTec"
            type="text"
            placeholder="Buscar por nombre..."
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
        </div>
        {["Todas las comidas", ...categorias].map((categoria, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded ${
              filtroCategoria ===
              (categoria === "Todas las comidas" ? "" : categoria)
                ? "bg-menta text-white"
                : "bg-verde text-white"
            }`}
            onClick={() =>
              setFiltroCategoria(
                categoria === "Todas las comidas" ? "" : categoria
              )
            }
          >
            {categoria}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 pt-4 p-4 m-6 grid-cols-1 ">
        {comidaFiltrada.map((comidaItem, index) => (
          <div
            key={index}
            className="h-full border-2 p-2 border-verde border-opacity-60 rounded-lg overflow-hidden"
          >
            <img
              className="lg:h-44 md:h-40 w-full bg-verde p-2 object-cover object-center"
              src={comidaItem.imagenes?.url_imagen}
              crossOrigin="anonymous"
            />
            <div className="p-2 hover:bg-verde hover:text-white transition duration-300 ease-in">
              <h2 className="text-base font-medium text-menta mb-1">
                {moment(comidaItem.createdAt).startOf("hour").fromNow()}
              </h2>
              <h1 className="text-xl font-semibold text-menta mb-3">
                {comidaItem.name}
              </h1>
              <p className="leading-relaxed mb-3">{comidaItem.description}</p>
              <div className="flex items-center flex-wrap">
                <span className="bg-verde p-2 text-white rounded-full inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
                  {comidaItem.categories?.name || "Sin categoria"}
                </span>
                <span className="text-menta mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
                  ${comidaItem.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardMenu;
