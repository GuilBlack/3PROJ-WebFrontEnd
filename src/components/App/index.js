import React, { useState } from 'react';
import './index.css';
import AuthContext from '../../context/AuthContext';
import { isLoggedIn } from '../../utils';

// import components
import AppNavbar from '../Navbar/index.js';
import Routes from '../Routes';

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }} >
      <AppNavbar />
      <Routes />
    </AuthContext.Provider>
  );
}

export default App;
