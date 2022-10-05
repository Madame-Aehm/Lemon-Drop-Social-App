import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const redirect = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputInfo, setInputInfo] = useState({});

  const handleFileAttach = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleChanges = (e) => {
    setInputInfo({ ...inputInfo, [e.target.name]: e.target.value})
  }

  const imageUpload = async () => {
    if (!selectedFile) {
      return "http://res.cloudinary.com/cocktail-recipes/image/upload/v1664980716/user_avatars/g7imx82ggre6lljzqb0r.png"
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
        return result.imageUrl
      } catch (error) {
        alert(error)
      }
    }
  } 

  const signUp = async () => {
    const display_picture = await imageUpload();
    inputInfo.profile_picture = display_picture; 
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
        alert(result.msg);
      } else if (result.error) {
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

      <div className='simple-display'>

        <FloatingLabel controlId="floatingInput" label="Enter your email address*" style={{width: "80%"}} >
          <Form.Control type="email" name="email" placeholder="name@example.com" onChange={handleChanges} required/>
        </FloatingLabel>

        <Form.Group controlId="formFile" style={{width: "80%"}}>
          <Form.Label>Choose a display picture:</Form.Label>
          <Form.Control type="file" name="profile_picture" onChange={handleFileAttach} />
          <Form.Text muted>You can also do this later from your profile page</Form.Text>
        </Form.Group>

        <FloatingLabel controlId="floatingInput" label="Choose a username*" style={{width: "80%"}} >
          <Form.Control type="username" name="username" placeholder="Username" onChange={handleChanges}/>
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Choose a password*" style={{width: "80%"}} >
          <Form.Control type="password" name="password" placeholder="Password" onChange={handleChanges}/>
          <Form.Text muted>Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.</Form.Text>
        </FloatingLabel>

        <p style={{width: "80%"}}>*required</p>

        <Button variant="success" onClick={signUp}>Sign up</Button>

        <p>Already have an account? <Link to={'/login'} replace={true}>Login</Link>!</p>

      </div>
      
    </div>
  )
}

export default SignUp