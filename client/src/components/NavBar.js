import React from 'react'
import { NavLink } from 'react-router-dom';
import lemonImage from "../lemon.png";
import '../css/nav.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {

  return (
    <Navbar collapseOnSelect bg="light" expand="md">
      <Navbar.Brand href="/"><img src={ lemonImage } alt="lemon icon" style={{ height: "30px", width: "auto", marginLeft: "1em" }}/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight: "1em" }}/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" style={{ width: "100%" }}>
          <NavLink id="links" to={"/home"} style={({isActive}) => ({
            fontWeight: isActive ? 700 : 'inherit',
            cursor: isActive ? "inherit" : "pointer"
          })}>Home</NavLink>
          <NavLink id="links" to={"/login"} style={({isActive}) => ({
            fontWeight: isActive ? 700 : 'inherit',
            cursor: isActive ? "inherit" : "pointer"
          })}>Login</NavLink>
  
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar