import React, { useState } from 'react';
import './App.css';
import AuthContext from './utils/authContext';
import { isLoggedIn } from './utils';

// import components
import AppNavbar from './components/navbar';
import Routes from './components/routes';

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
