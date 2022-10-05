import React from 'react'
import NavBar from '../components/NavBar'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <NavBar />
      <h1 className='page-title'>Login</h1>
      <div className='simple-display'>
        <FloatingLabel controlId="floatingInput" label="Enter Email Address" style={{width: "80%"}} >
          <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Enter Password" style={{width: "80%"}} >
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
        <Button variant="success" onClick={()=>console.log("button clicked")}>Login</Button>
        <p>Not signed up yet? <Link to={'/sign-up'} replace={true}>Click here</Link>!</p>
      </div>
    </div>
  )
}

export default Login