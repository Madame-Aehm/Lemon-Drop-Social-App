import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './views/Home';
import LaunchPage from './views/LaunchPage';
import Login from './views/Login';
import SignUp from './views/SignUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LaunchPage/> } />
          <Route path='/home' element={ <Home/> } />
          <Route path='/login' element={ <Login/> } />
          <Route path='/sign-up' element={ <SignUp/> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
