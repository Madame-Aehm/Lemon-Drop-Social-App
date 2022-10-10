import React, { useContext, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import { passwordValidation } from '../utils/JSvalidationFunctions';
import { AuthContext } from '../context/AuthContext.js'

function SignUp() {
  const { logout, user } = useContext(AuthContext);
  const redirect = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
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

  const handleFileAttach = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleChanges = (e) => {
    setInputInfo({ ...inputInfo, [e.target.name]: e.target.value});
    setPWinvalid(false);
  }

  const handleSubmit = (e) => {
    const validPassword = passwordValidation(inputInfo.password);
    if (validPassword) {
      e.preventDefault();
      signUp();
    } else {
      e.preventDefault();
      e.stopPropagation();
      setPWinvalid(true);
    }
  }

  const imageUpload = async () => {
    if (!selectedFile) {
      return {url: "http://res.cloudinary.com/cocktail-recipes/image/upload/v1664980716/user_avatars/g7imx82ggre6lljzqb0r.png",
              public_id: null}
    } else {
      const formData = new FormData();
      formData.append("image", selectedFile);
      const reqOptions = {
        method: "POST",
        body: formData
      };
      try {
        const response = await fetch("http://localhost:5000/users/upload-image", reqOptions);
        const result = await response.json();
        return result
      } catch (error) {
        alert("image upload error: ", error)
      }
    }
  }

  const deleteImage = async (image) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const imageData = JSON.stringify(image);
    const reqOptions = {
      method: "POST",
      headers: myHeaders,
      body: imageData
    };
    try {
      const response = await fetch("http://localhost:5000/users/delete-image", reqOptions);
      const result = await response.json();
      console.log(result);
    } catch(error) {
      alert("error deleting image: ", error);
    }
  }

  const signUp = async () => {
    const image = await imageUpload();
    inputInfo.profile_picture = image; 
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const newUser = JSON.stringify(inputInfo);
    const reqOptions = {
      method: "POST",
      headers: myHeaders,
      body: newUser,
    }
    try {
      const response = await fetch("http://localhost:5000/users/sign-up", reqOptions);
      const result = await response.json();
      console.log(result);
      if (result.error) {
        if (image.public_id) {
          deleteImage(image)
        }
        alert("sign up error: ", result.error);
      } else {
        alert("Successfully signed up! Please log in.");
        redirect("/login", { replace: true });
      }
    } catch(error) {
      console.log("sign up error2: ", error);
    }
  }

  return (
    <div>
      <h1 className='page-title'>Sign Up!</h1>

      {!user && 
        <Form name="signUpForm" onSubmit={handleSubmit} className='simple-display'>
          <FloatingLabel controlId="floatingInputEmail" label="Enter your email address*" style={{width: "80%"}} >
            <Form.Control type="email" name="email" placeholder="name@example.com" onChange={handleChanges} required/>
          </FloatingLabel>

          <FloatingLabel controlId="floatingInputUsername" label="Choose a username*" style={{width: "80%"}}>
            <Form.Control type="username" name="username" placeholder="Username" onChange={handleChanges} required/>
          </FloatingLabel>

          <InputGroup hasValidation style={{width: "80%"}}>
            <Form.Control type={passwordVisibility} name="password" placeholder="Password*" onChange={handleChanges} isInvalid={PWinvalid} required/>
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
          
          <Form.Group controlId="formFile" style={{width: "80%"}}>
            <Form.Label>Choose a display picture:</Form.Label>
            <Form.Control type="file" name="profile_picture" onChange={handleFileAttach} />
            <Form.Text muted>You can also do this later from your profile page</Form.Text>
          </Form.Group>

          <p style={{width: "80%", textAlign: "right", margin: 0}}>*required</p>

          <Button size="lg" variant="success" type="submit">Sign up</Button>
          <p>Already have an account? <Link to={'/login'} replace={true}>Login</Link>!</p>
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

export default SignUp