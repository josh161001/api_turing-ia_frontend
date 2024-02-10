import React, { useEffect } from "react";
import urlAxios from "../../config/axios";
import { useNavigate, useParams } from "react-router-dom";

const VerificarCuenta = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verificarToken = async () => {
      try {
        await urlAxios.get(`/users/verification/${token}`);
      } catch (error) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    };

    verificarToken();
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="max-w-screen-lg bg-white rounded-md shadow-lg p-4 sm:p-12">
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
          Tu cuenta ha sido verificada en
          <span className="text-menta"> la App</span>
        </h1>
      </div>
    </div>
  );
};

export default VerificarCuenta;
