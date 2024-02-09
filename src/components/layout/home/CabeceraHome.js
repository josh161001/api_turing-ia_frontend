import BotonSaberMas from "../../common/BotonSaberMas";

const CabeceraHome = () => {
  return (
    <div className="relative isolate px-6 pt-26 lg:px-8">
      <div className="mx-auto max-w-2xl py-20 sm:py-42 lg:py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-menta sm:text-4xl">
            Descubre las delicias que están por venir
          </h1>
          <p className="mt-4 text-1xl leading-8 text-white">
            Echa un vistazo a esta página para enterarte de las últimas
            novedades en el restaurante desde la comodidad de tu hogar.
          </p>
          <div className="mt-6 mb-8 flex items-center justify-center gap-x-6">
            {/* <BotonVerNoticias /> */}
            <BotonSaberMas />
          </div>
        </div>

        <main>
          <div className="absolute  left-1/2 transform -translate-x-1/2 lg:pt-2 pt-8 -translate-y-1/6">
            <div className="grid grid-cols-3 gap-6 overflow-x-auto w-80 max-w-full">
              {/* Contenido de los cuadros */}

              {/* Primer cuadro */}
              <div className="bg-menta text-center rounded-lg p-4 shadow-md w-full sm:w-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
                <i className="fas fa-pizza-slice text-5xl text-gray-800"></i>
              </div>
              {/* Segundo cuadro */}
              <div className="bg-menta text-center rounded-lg p-4 shadow-md w-full sm:w-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
                <i className="fas fa-hamburger text-5xl text-gray-800"></i>
              </div>
              {/* Tercer cuadro */}
              <div className="bg-menta text-center rounded-lg p-4 shadow-md w-full sm:w-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
                <i className="fas fa-ice-cream text-5xl text-gray-800"></i>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CabeceraHome;
