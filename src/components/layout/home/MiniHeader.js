import React from "react";

const MiniHeader = () => {
  return (
    <div className="bg-verde text-white py-2 px-4 flex justify-between items-center">
      {/* Contenedor para el número a la izquierda */}
      <div className="flex items-center">
        <div className="mr-4">
          <span className="text-xl font-bold lg:pl-12"> +52 81-3455-2454</span>
        </div>
      </div>

      {/* Contenedor para los íconos a la derecha */}
      <div className="flex items-center text-menta lg:pr-12">
        <a href="#" className="mr-2">
          <i className="fab fa-facebook-square"></i>
        </a>
        <a href="#" className="mr-2">
          <i className="fab fa-twitter-square"></i>
        </a>
        <a href="#">
          <i className="fab fa-instagram-square"></i>
        </a>
      </div>
    </div>
  );
};

export default MiniHeader;
