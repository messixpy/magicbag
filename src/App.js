import React, { useState, useEffect, createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";

const AppContext = createContext(null);
function App() {
  const toggleNav = () => {
    setShowNav((prevShowNav) => !prevShowNav);
  };
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {}, []);
  return (
    <AppContext.Provider value={{ showNav, toggleNav }}>
      <MainRoutes />
      <ToastContainer />
    </AppContext.Provider>
  );
}

export default App;
