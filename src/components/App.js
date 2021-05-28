import React, { useState } from 'react';
import '../styles/App.css';
import AuthContext from '../context/AuthContext';
import { isLoggedIn } from '../utils';

// import components
import AppNavbar from './Navbar';
import Routes from './Routes';

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
