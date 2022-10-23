import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import '../css/launch&nav.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../context/AuthContext.js'
import { formatImageThumb } from '../utils/JSFunctions';
import Fade from 'react-bootstrap/Fade';

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const [mount, setMount] = useState(false);
  const [expanded, setExpanded] = useState(false);

  function handleLogout () {
    logout();
    setExpanded(false);
  }

  useEffect(() => {
      setMount(true);
  }, [])
  

  return (
    <Fade in={mount}>
      <header className='header-container'>
        <a href='/'>
          <img src="https://res.cloudinary.com/cocktail-recipes/image/upload/v1666457159/assets/lemon_wnjxh9.png" 
            alt='Lemon Drop'
            title='Lemon Drop'
            className='header-image'/>
        </a>
        <h4 className='header-title'>lemon drop recipes</h4>
        <Navbar expanded={expanded} bg="white" expand="sm" className='nav-container justify-content-center'>
          <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='mx-auto align-items-sm-baseline gap-3' as="ul">
              {!user && 
                <>
                  <Nav.Item as="li">
                    <NavLink onClick={() => setExpanded(false)} to="/home" className="nav-link">Home</NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink onClick={() => setExpanded(false)} to="/login" className="nav-link">Login</NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink onClick={() => setExpanded(false)} to="/sign-up" className="nav-link">Sign up</NavLink>
                  </Nav.Item>
                </>
              }
              {user && 
                <>
                  <Nav.Item as="li">
                    <NavLink onClick={() => setExpanded(false)} to="/my-profile" className="nav-link">
                      <img src={formatImageThumb(user.profile_picture.url)} alt={"My profile"} className="nav-thumb" />
                      Profile
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink onClick={() => setExpanded(false)} as={NavLink} to="/home" className="nav-link">Home</NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink onClick={() => setExpanded(false)} to="/new-recipe" className="nav-link">Submit</NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Link onClick={handleLogout} className="nav-link">Logout</Link>
                  </Nav.Item>
                </>
              }
            </Nav>
            
          </Navbar.Collapse>
        </Navbar>



      </header>
    </Fade>

  )
}

export default NavBar