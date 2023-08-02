import React, { useState, useEffect,createContext } from 'react';

import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes';

const AppContext = createContext(null);
function App() {
  const toggleNav = () => {
    setShowNav(prevShowNav => !prevShowNav);
  };
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {

  }, []);
  return (
    
      <AppContext.Provider value={{ showNav, toggleNav }}>
        <MainRoutes />
      </AppContext.Provider>
    

  );
}

export default App;