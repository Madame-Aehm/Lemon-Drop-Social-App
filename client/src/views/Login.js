import React, { useContext, useState } from 'react'
import NavBar from '../components/NavBar'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import { passwordValidation } from '../utils/JSvalidationFunctions';
import { AuthContext } from '../context/AuthContext.js'

function Login() {

  const { login } = useContext(AuthContext);

  const [inputInfo, setInputInfo] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const [showOrHide, setShowOrHide] = useState("Show");
  const [PWinvalid, setPWinvalid] = useState(false);

  const passwordToggle = () => {
    if (passwordVisibility === "password") {
      setPasswordVisibility("text");
      setShowOrHide("Hide")
    } else {
      setPasswordVisibility("password");
      setShowOrHide("Show")
    }
  }

  const handleChanges = (e) => {
    setInputInfo({ ...inputInfo, [e.target.name]: e.target.value });
    setPWinvalid(false);
  }

  const handleSubmit = (e) => {
    const validPassword = passwordValidation(inputInfo.password);
    if (validPassword) {
      e.preventDefault();
      login(inputInfo);
    } else {
      e.preventDefault();
      e.stopPropagation();
      setPWinvalid(true);
    }
  }

  return (
    <div>
      <NavBar />

      <h1 className='page-title'>Login</h1>

      <Form name="loginForm" onSubmit={handleSubmit} className='simple-display'>

        <FloatingLabel controlId="floatingInputEmail" label="Enter your email address" style={{width: "80%"}} >
          <Form.Control type="email" name="email" placeholder="name@example.com" onChange={handleChanges} required/>
        </FloatingLabel>

        <InputGroup hasValidation style={{width: "80%"}}>
          <Form.Control type={passwordVisibility} name="password" placeholder="Password" onChange={handleChanges} isInvalid={PWinvalid} required/>
          <Button onClick={passwordToggle} variant="outline-success" id="button-addon2">
          {showOrHide}
          </Button>
          <Form.Control.Feedback type="invalid">
            Password must be at least 6 characters, include at least one number, and mix capital and lowercase letters.
          </Form.Control.Feedback>
        </InputGroup>

        {!PWinvalid && 
            <Form.Text muted style={{width: "80%", marginTop: "-0.8em"}}>Password must be at least 6 characters, include at least one number, and mix capital and lowercase letters.</Form.Text>
        }

        <p style={{width: "80%", textAlign: "right", margin: 0}}>*required</p>

        <Button size="lg" variant="success" type="submit">Login</Button>

        <p>Not signed up yet? <Link to={'/sign-up'} replace={true}>Click here</Link>!</p>

      </Form>
    </div>
  )
}

export default Login