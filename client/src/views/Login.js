import React, { useContext, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { passwordValidation } from '../utils/JSFunctions';
import { AuthContext } from '../context/AuthContext.js'
import PasswordInput from '../components/PasswordInput';

function Login() {

  const { login, logout, user } = useContext(AuthContext);
  const [inputInfo, setInputInfo] = useState({});
  const [PWinvalid, setPWinvalid] = useState(false);


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
      <h1 className='page-title'>Login</h1>
      {!user &&
        <Form name="loginForm" onSubmit={handleSubmit} className='simple-display'>

          <FloatingLabel controlId="floatingInputEmail" label="Enter your email address" style={{width: "80%"}} >
            <Form.Control type="email" name="email" placeholder="name@example.com" onChange={handleChanges} required/>
          </FloatingLabel>

          <PasswordInput handleChanges={handleChanges} PWinvalid={PWinvalid} styling={{width: "80%"}} textStyling={{width: "80%", marginTop: "-0.8em"}} placeholder={"Password"} />

          <Button size="lg" variant="success" type="submit">Login</Button>

          <p>Not signed up yet? <Link to={'/sign-up'} replace={true}>Sign up</Link>!</p>

        </Form>
      }
      {user && 
        <div className='simple-display'>
          <p className='p-type-1'><strong>{user.username}</strong> is already logged in.</p>
          <Button size="lg" variant="success" onClick={logout}>Logout?</Button>
        </div>
      }
    </div>
  )
}

export default Login