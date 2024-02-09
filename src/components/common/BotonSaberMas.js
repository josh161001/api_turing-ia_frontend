const BotonSaberMas = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <button
      onClick={scrollToMenu}
      className="hover:bg-green-500 px-4 rounded rounded-md bg-menta px-3.5 py-2.5 text-sm  text-white"
    >
      Saber más
    </button>
  );
};

export default BotonSaberMas;
