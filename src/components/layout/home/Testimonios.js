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
          console.log(respuesta.data);
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
        <div className=" rounded-lg  p-6">
          <img
            src="https://sergiomadrigal.com/wp-content/uploads/2014/01/blog_fisheye.jpg"
            alt="Avatar"
            className="rounded-full w-24 h-24 mx-auto mb-4"
          />
          <p className="text-sm text-verde italic mb-4">
            {testimonio.description}
          </p>
          <p className="text-menta">- {testimonio.name}</p>
        </div>
      ))}
    </>
  );
};

export default Testimonios;
