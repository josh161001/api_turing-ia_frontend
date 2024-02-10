import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import urlAxios from "../../../config/axios";

const Testimonios = () => {
  const [auth, guardarAuth] = useContext(AppContext);

  const [testimonios, guardarTestimonios] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.access_token !== "") {
      const consultaAPI = async () => {
        try {
          const respuesta = await urlAxios.get("/testimonies", {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            },
          });
          guardarTestimonios(respuesta.data.testimonies);
        } catch (error) {
          navigate("/");
        }
      };
      consultaAPI();
    }
  }, [auth.access_token, navigate]);

  return (
    <>
      {testimonios.map((testimonio, index) => (
        <div className=" rounded-lg  p-6" key={index}>
          <img
            className="rounded-full object-cover w-24 h-24 mx-auto mb-4"
            src={testimonio.imagenes?.url_imagen}
            alt="Testimonial"
            crossOrigin="anonymous"
          />

          <p className="text-lg text-verde italic mb-4">
            <span className="text-4xl">"</span> {testimonio.description}
            <span className="text-4xl">"</span>
          </p>
          <p className="text-menta">- {testimonio.name}</p>
        </div>
      ))}
    </>
  );
};

export default Testimonios;
