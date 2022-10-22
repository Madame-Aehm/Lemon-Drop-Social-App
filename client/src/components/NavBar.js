import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import '../css/launch&nav.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../context/AuthContext.js'
import { formatImageThumb } from '../utils/JSFunctions';

function NavBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className='header-container'>
      <a href='/'>
        <img src="https://res.cloudinary.com/cocktail-recipes/image/upload/v1666457159/assets/lemon_wnjxh9.png" 
          alt='Lemon Drop'
          title='Lemon Drop'
          className='header-image'/>
      </a>
      <h4 className='header-title'>lemon drop recipes</h4>
      <Navbar collapseOnSelect bg="white" expand="sm" className='nav-container'>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Container>
            <Nav className='mx-auto justify-content-center' as="ul">
              <Nav.Item as="li">
                <NavLink to="/home">Home</NavLink>
              </Nav.Item>
              {!user && 
                <>
                  <Nav.Item as="li">
                    <NavLink to="/login">Login</NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink to="/sign-up">Sign up</NavLink>
                  </Nav.Item>
                  {/* <NavLink className={"links"} to={"/login"} style={({isActive}) => ({
                    // display: isActive ? "none" : "block"
                  })}>Login</NavLink> */}
                </>
              }
              {user && 
                <>
                  <Nav.Item as="li">
                    <NavLink to="/my-profile">
                      <img src={formatImageThumb(user.profile_picture.url)} alt={user.username + "'s profile"} />
                      {user.username}
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink to="/new-recipe">Submit</NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink onClick={logout}>Logout</NavLink>
                  </Nav.Item>
                </>
              }
            </Nav>

          </Container>
          
        </Navbar.Collapse>
      </Navbar>



    </header>

  )
}

export default NavBar