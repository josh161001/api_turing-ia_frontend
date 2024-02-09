import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import urlAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import HeaderHome from "../../components/layout/home/HeaderHome";
import FooterHome from "../../components/layout/home/FooterHome";
import CabeceraHome from "../../components/layout/home/CabeceraHome";
import MiniHeader from "../../components/layout/home/MiniHeader";
import CardMenu from "../../components/layout/home/CardMenu";
import Testimonios from "../../components/layout/home/Testimonios";

const PaginaPrincipal = () => {
  const [auth, guardarAuth] = useContext(AppContext);
  const [usuario, guardarUsuario] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.access_token !== "") {
      const consultaAPI = async () => {
        try {
          const respuesta = await urlAxios.get("/auth/profile", {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            },
          });

          guardarUsuario(respuesta.data.data);
        } catch (error) {
          navigate("/");
        }
      };
      consultaAPI();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div>
        <MiniHeader />
        <div className="bg-verde">
          <HeaderHome />
          <CabeceraHome />
        </div>
        <main id="menu">
          <h2 className="text-center text-4xl text-menta text font-semibold pt-16 mt-8 ">
            Nuestro Menu
          </h2>
          <div className="grid lg:grid-cols-3 gap-4 pt-4 p-4 m-6 grid-cols-1 ">
            <CardMenu />
          </div>
        </main>

        <section className="text-center mt-8" id="servicios">
          <h2 className="text-4xl text-menta font-semibold mb-4">Servicios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 p-6 m-4 gap-8">
            {/* Servicio 1 */}
            <div className="bg-menta p-8 rounded-lg">
              <i className="fas fa-utensils text-5xl text-gray-800 mb-4"></i>
              <p className="text-lg text-gray-600">
                Comida para eventos especiales
              </p>
            </div>
            {/* Servicio 2 */}
            <div className="bg-menta p-8 rounded-lg">
              <i className="fas fa-concierge-bell text-5xl  text-gray-800 mb-4"></i>
              <p className="text-lg text-gray-600">Atención de calidad</p>
            </div>
            {/* Servicio 3*/}
            <div className="bg-menta p-8 rounded-lg">
              <i className="fas fa-truck text-5xl text-gray-800 mb-4"></i>
              <p className="text-lg text-gray-600">Envíos a domicilio</p>
            </div>
            {/* Servicio 4:*/}
            <div className="bg-menta p-8 rounded-lg">
              <i className="fas fa-calendar-check text-5xl text-gray-800 mb-4"></i>
              <p className="text-lg text-gray-600">Reservas online</p>
            </div>
          </div>
        </section>

        <section id="testimonios">
          <h2 className="text-4xl text-menta text-center font-semibold mb-4">
            Testimonios
            <div className="grid lg:grid-cols-3 gap-4 pt-4 p-4 m-6 grid-cols-1 ">
              <Testimonios />
            </div>
          </h2>
        </section>
        <FooterHome />
      </div>
    </>
  );
};

export default PaginaPrincipal;
