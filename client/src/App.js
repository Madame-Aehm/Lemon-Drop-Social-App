import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import Home from './views/Home';
import LaunchPage from './views/LaunchPage';
import Login from './views/Login';
import SignUp from './views/SignUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={ <LaunchPage/> } />
            <Route path='/home' element={ <Home/> } />
            <Route path='/login' element={ <Login/> } />
            <Route path='/sign-up' element={ <SignUp/> } />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
