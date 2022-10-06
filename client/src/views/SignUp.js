import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import { passwordValidation } from '../utils/JSvalidationFunctions';

function SignUp() {
  const redirect = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputInfo, setInputInfo] = useState({});
  const [validated, setValidated] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const [showOrHide, setShowOrHide] = useState("Show");

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
    setInputInfo({ ...inputInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if ((form.checkValidity() === false)) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    signUp();
    // if (validated) {
    //   const validPW = passwordValidation(inputInfo.password);
    //   if (validPW) {
    //     signUp();
    //   } else {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     alert("Password must contain both lowercase and capital letters, and be at least 6 characters long.")
    //   }
    // }
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
        console.log(result);
        return result
      } catch (error) {
        alert(error)
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
      console.log(error);
    }
  }

  const signUp = async () => {
    const image = await imageUpload();
    inputInfo.profile_picture = image.url; 
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
      if (result.msg) {
        if (image.public_id) {
          deleteImage(image)
        }
        alert(result.msg);
      } else if (result.error) {
        if (image.public_id) {
          deleteImage(image)
        }
        alert(result.error);
      } else {
        alert("Successfully signed up! Please log in.");
        redirect("/login", {replace: true});
      }
    } catch(error) {
      console.log("error: ", error);
    }
  }

  return (
    <div>
      <NavBar />

      <h1 className='page-title'>Sign Up!</h1>

        <Form name="signUpForm" noValidate validated={validated} onSubmit={handleSubmit} className='simple-display'>
          <FloatingLabel controlId="floatingInput" label="Enter your email address*" style={{width: "80%"}} >
            <Form.Control type="email" name="email" placeholder="name@example.com" onChange={handleChanges} required/>
            <Form.Control.Feedback type="invalid">
              Please enter your email
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Choose a username*" style={{width: "80%"}}>
            <Form.Control type="username" name="username" placeholder="Username" onChange={handleChanges} required/>
            <Form.Control.Feedback type="invalid">
              Please enter a username
            </Form.Control.Feedback>
          </FloatingLabel>

          <InputGroup hasValidation style={{width: "80%"}}>
            <Form.Control type={passwordVisibility} name="password" placeholder="Password*" onChange={handleChanges} required/>
            <Button onClick={passwordToggle} variant="outline-secondary" id="button-addon2">
            {showOrHide}
            </Button>
            <Form.Control.Feedback type="invalid">
              Please enter a password
            </Form.Control.Feedback>
          </InputGroup>

          <Form.Group controlId="formFile" style={{width: "80%"}}>
            <Form.Label>Choose a display picture:</Form.Label>
            <Form.Control type="file" name="profile_picture" onChange={handleFileAttach} />
            <Form.Text muted>You can also do this later from your profile page</Form.Text>
          </Form.Group>

          <p style={{width: "80%"}}>*required</p>

          <Button variant="success" type="submit">Sign up</Button>
          <p>Already have an account? <Link to={'/login'} replace={true}>Login</Link>!</p>
        </Form>



      
    </div>
  )
}

export default SignUp