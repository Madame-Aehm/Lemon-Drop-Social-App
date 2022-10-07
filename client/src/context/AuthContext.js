import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getToken from '../utils/getToken.js';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const redirect = useNavigate();
  const [user, setUser] = useState(null);
  
  const checkForUser = () => {
    const token = getToken();
    if (token) {
      setUser(token);
      console.log("User logged in");
    } else {
      setUser(null);
      console.log("User NOT logged in");
    }
  }

  const login = async (inputInfo) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const userLogin = JSON.stringify(inputInfo);
    const reqOptions = {
      method: "POST",
      headers: myHeaders,
      body: userLogin,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/users/login",
        reqOptions
      );
      const result = await response.json();
      if (result.error) {
        console.log(result);
        alert("Login error: ", result.error.error);  //wtf just show my error message!!
        return
      }
      if (result.token) {
        console.log(result);
        localStorage.setItem("token", result.token);
        alert(result.user.username + " has successfully logged in!")
        checkForUser();
        redirect("/home", {replace: true});
      }
    } catch (error) {
      alert("Login error: ", error)
    }
  }

  const logout = () => {
    alert(user.username + " has been logged out.")
    localStorage.removeItem("token");
    checkForUser();
  };

  useEffect(() => {
    checkForUser();
  })

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      { props.children }
    </AuthContext.Provider>
  )
}