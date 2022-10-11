import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getToken from '../utils/getToken.js';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const redirect = useNavigate();
  const [user, setUser] = useState(null);

//   function parseJwt (token) {
//     return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
// }
  
  const checkForUser = () => {
    const token = getToken();
    if (token) {
      console.log("User logged in");
      getUser(token);
    } else {
      console.log("User NOT logged in");
      setUser(null);
    }
  }

  const getUser = async (token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const reqOptions = {
      method: "GET",
      headers: myHeaders
    };
    try {
      const response = await fetch("http://localhost:5000/users/my-profile", reqOptions);
      const result = await response.json();
      setUser(result);
    } catch(error) {
      console.log(error)
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
        alert("Login error: " + result.error);  //wtf just show my error message!!
        return
      }
      if (result.token) {
        localStorage.setItem("token", result.token);
        setUser(result.user);
        alert(result.user.username + " has successfully logged in!");
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
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkForUser, login, logout }}>
      { props.children }
    </AuthContext.Provider>
  )
}