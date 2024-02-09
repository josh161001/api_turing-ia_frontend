import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import urlAxios from "../../../config/axios";
import moment from "moment";
import "moment/locale/es";

const CardMenu = () => {
  const [auth, guardarAuth] = useContext(AppContext);
  const [comida, guardarComida] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.access_token !== "") {
      const consultaAPI = async () => {
        try {
          const respuesta = await urlAxios.get("/menu", {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            },
          });
          guardarComida(respuesta.data.menu);
        } catch (error) {
          navigate("/");
        }
      };
      consultaAPI();
    } else {
      navigate("/");
    }
  }, [auth.access_token, navigate]);

  return (
    <>
      {comida.map((comidaItem, index) => (
        <div
          key={index}
          className="h-full border-2 p-2 border-verde border-opacity-60 rounded-lg overflow-hidden"
        >
          <img
            className="lg:h-44 md:h-40 w-full bg-verde p-2 object-cover object-center"
            src="https://picsum.photos/id/188/720/400"
            alt="blog"
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
              <span className="text-menta mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
                {comidaItem.categories.name}
              </span>
              <span className="text-menta mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
                ${comidaItem.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardMenu;
