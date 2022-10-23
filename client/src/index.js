import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import { RecipesContextProvider } from './context/RecipesContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <RecipesContextProvider>
          <App />
        </RecipesContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

