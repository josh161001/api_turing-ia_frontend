import React, { useState } from "react";

const AppContext = React.createContext([{}, () => {}]);

const AppProvider = (props) => {
  const [auth, guardarAuth] = useState({
    access_token: localStorage.getItem("access_token") || "",
    auth: false,
  });

  return (
    <AppContext.Provider value={[auth, guardarAuth]}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
