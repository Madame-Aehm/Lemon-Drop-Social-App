import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './views/Home';
import LaunchPage from './views/LaunchPage';
import Login from './views/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LaunchPage/> } />
          <Route path='/home' element={ <Home/> } />
          <Route path='/login' element={ <Login/> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
