import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import lemonImage from "../lemon.png";
import '../css/nav.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../context/AuthContext.js'

function NavBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect bg="light" expand="sm">
      <Navbar.Brand href="/"><img src={ lemonImage } alt="lemon icon" style={{ height: "30px", width: "auto", marginLeft: "1em" }}/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight: "1em" }}/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" style={{ width: "100%" }}>
          <NavLink className={"links"} to={"/home"} style={({isActive}) => ({
            fontWeight: isActive ? 700 : 'inherit',
            cursor: isActive ? "inherit" : "pointer",
            color: "#b34414"
          })}>Home</NavLink>
          {!user && 
            <NavLink className={"links"} to={"/login"} style={({isActive}) => ({
              fontWeight: isActive ? 700 : 'inherit',
              cursor: isActive ? "inherit" : "pointer",
              color: "#b34414"
            })}>Login</NavLink>
          }
          {user && 
            <>
              <NavLink className={"links"} to={"/my-profile"} style={({isActive}) => ({
              fontWeight: isActive ? 700 : 'inherit',
              cursor: isActive ? "inherit" : "pointer",
              color: "#b34414"
            })}>Profile</NavLink>
              <NavLink className={"links"} onClick={logout} >Logout</NavLink>
            </>
          }
          
  
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar