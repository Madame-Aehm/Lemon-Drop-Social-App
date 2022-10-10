import React, { useContext } from 'react'
import Button from 'react-bootstrap/esm/Button.js';
import { AuthContext } from '../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const redirect = useNavigate();

  const handleClick = () => {
    redirect("/login", {replace: true});
  }

  return (
    <>
      {user ? children : 
        <div className='simple-display'>
          <p className='p-type-1'>Access to this page is restricted to logged-in users.</p>
          <Button size="lg" variant="success" onClick={handleClick}>Login?</Button>
        </div>
      }
    </>
  )
}

export default ProtectedRoute