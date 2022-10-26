import React from 'react';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './views/Home';
import LaunchPage from './views/LaunchPage';
import Login from './views/Login';
import MyProfile from './views/MyProfile';
import SignUp from './views/SignUp';
import NewRecipe from './views/NewRecipe';
import ViewRecipe from './views/ViewRecipe';
import ViewUser from './views/ViewUser';
import UpdateRecipe from './views/UpdateRecipe';
import ReturnToTop from './components/ReturnToTop';

function App() {
  return (
    <>
      <NavBar />
      <ReturnToTop />
      <Routes>
        <Route path='*' element={ <LaunchPage/> } />
        <Route path='/' element={ <LaunchPage/> } />
        <Route path='/home' element={ <Home/> } />
        <Route path='/login' element={ <Login/> } />
        <Route path='/sign-up' element={ <SignUp/> } />
        <Route path='/my-profile' element={ <ProtectedRoute> <MyProfile/> </ProtectedRoute> } />
        <Route path='/new-recipe' element={ <ProtectedRoute> <NewRecipe/> </ProtectedRoute> } />
        <Route path='/update-recipe' element={ <ProtectedRoute> <UpdateRecipe/> </ProtectedRoute> } />
        <Route path='/view-recipe/:_id' element={ <ViewRecipe/> } />
        <Route path='/view-user/:_id' element={ <ViewUser/> } />
      </Routes>
    </>
  );
}

export default App;
