import React, { useContext, useEffect, useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/esm/Button';
import getToken from '../utils/getToken'
import { AuthContext } from '../context/AuthContext.js'
import { emailValidation, passwordValidation } from '../utils/JSFunctions';
import { deleteImage, uploadImage } from '../utils/imageMangement';
import PasswordInput from './PasswordInput';
import PageLoader from './PageLoader';
import * as Icon from 'react-bootstrap-icons';

function MyAccount({ loading, setLoading }) {
  const { user, setUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = useState("none");
  const [hideOnEdit, setHideOnEdit] = useState("block");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPWinvalid, setNewPWinvalid] = useState(false);
  const [oldPWinvalid, setOldPWinvalid] = useState(false);

  const handleEditSwitch = () => {
    if (editMode) {
      setEditMode(false)
    } else {
      setEditMode(true)
      setUsername(user.username)
      setEmail(user.email)
    }
  }

  const editModeToggle = () => {
    if (editMode) {
      setInputs("flex");
      setHideOnEdit("none");
    } else {
      setInputs("none");
      setHideOnEdit("flex");
    }
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleUsernameClick = async() => {
    if (username === "") {
      alert("Username can't be nothing.")
    } else if (user.username === username) {
      alert(username + " is already your username.")
    } else {
      if (window.confirm("Are you sure you want to change your username from " + user.username + " to " + username + "?")) {
        setLoading(true);
        await updateUser({username: username});
        setLoading(false);
      }
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleEmailClick = async() => {
    if (!emailValidation(email)) {
      alert("Invalid email format. Please try again.")
    } else if (user.email === email) {
      alert(email + " is already your registered email.")
    } else {
      if (window.confirm("Are you sure you want to change your email from " + user.email + " to " + email + "?")) {
        setLoading(true);
        await updateUser({email: email});
        setLoading(false);
      }
    }
  }

  const handleFileAttach = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleFileClick = async() => {
    if (!selectedFile && !user.profile_picture.public_id) {
      alert("Your display picture is already set to default.")
    }
    else if (!selectedFile && user.profile_picture.public_id) {
      if (window.confirm("There is no file selected. This will return your display picture back to default. Is that ok?")) {
        setLoading(true);
        await deleteImage(user.profile_picture);
        updateUser(
          {profile_picture: {
          url: "http://res.cloudinary.com/cocktail-recipes/image/upload/v1664980716/user_avatars/g7imx82ggre6lljzqb0r.png",
          public_id: null
          }});
        setLoading(false);
      }
    } else {
      if (window.confirm("You're sure you want to update your display picture?")) {
        setLoading(true);
        if (user.profile_picture.public_id) {
          await deleteImage(user.profile_picture);
        }
        const image = await uploadImage(selectedFile, "http://localhost:5000/users/upload-image");
        updateUser({ profile_picture: image });
        setSelectedFile(null);
        const fileInput = document.querySelector("input[name='profile_picture']");
        fileInput.value = "";
        setLoading(false);
      }
    }
  }

  const handleNewPWChange = (e) => {
    setNewPassword(e.target.value);
    setNewPWinvalid(false);
  }

  const handlePWClick = () => {
    const validPassword = passwordValidation(newPassword);
    if (validPassword) {
      setShowModal(true);
    } else {
      setNewPWinvalid(true);
    }
  }

  const handleOldPWChange = (e) => {
    setOldPassword(e.target.value);
    setOldPWinvalid(false);
  }

  const handleOldPWClick = async() => {
    const validPassword = passwordValidation(oldPassword);
    if (validPassword) {
      setLoading(true);
      try {
        const result = await verifyAndUpdatePassword(oldPassword, newPassword);
        if (result.error) {
          setLoading(false);
          return alert(result.error)
        } else {
          setLoading(false);
          alert(result)
          setShowModal(false);
          const pwInput = document.querySelector("input[name='password']");
          pwInput.value = "";
        }
      } catch(error) {
        console.log("error: ", error)
      }
    } else {
      setOldPWinvalid(true);
    }
  }

  const verifyAndUpdatePassword = async() => {
    const token = getToken();
    if (token) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        const reqBody = JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword
        });
        const reqOptions = {
          method: "POST",
          headers: myHeaders,
          body: reqBody
        }
        const response = await fetch("http://localhost:5000/users/verify-password", reqOptions);
        const result = await response.json();
        return result
      } catch(error) {
        console.log(error);
      }
    }
  }

  const updateUser = async (item) => {
    const token = getToken();
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("Content-Type", "application/json");
      const toUpdate = JSON.stringify(item);
      const reqOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: toUpdate
      }
      const response = await fetch("http://localhost:5000/users/update-user", reqOptions);
      const result = await response.json();
      setUser(result);
    } else {
      console.log("no token")
    }
  }

  useEffect(() => {
    editModeToggle();
  }, [editMode])
  
  const inputDisplay = {
    display: inputs,
    flexDirection: "column",
    alignItems: "center",
  }

  const currentDisplay = {
    display: hideOnEdit,
    width: "fit-content",
    flexDirection: "column", 
    gap: "0.5em", 
    border: "solid 1px #1b8f47", 
    padding: "1em", 
    borderRadius: "0.5em"
  }

  return (
    <>
      {user && 
        <div className='simple-display'>
          {loading && <PageLoader />}

          <div className='simple-align'>
            <h4 className='sub-title'>Account Details</h4>
            <Button style={{padding: "0 0.3em", paddingBottom: "0.2em"}} variant='warning' title="Edit Account Details" 
              onClick={handleEditSwitch}>
              <Icon.PencilSquare style={{fontSize: "large"}}/>
            </Button>
          </div>

          <img className='profile-img' src={user.profile_picture.url} alt={`${user.username}'s profile`}/>

          <div style={currentDisplay}>
            <h5 className='account-mini-title'>{user.username}</h5>

            <div className='simple-align'>
              <h6 className='account-mini-title'>Email: </h6>
              <h6 className='sub-title'>{user.email}</h6>
            </div>

            <div className='simple-align'>
              <h6 className='account-mini-title'>User for: </h6>
              <h6 className='sub-title'>{formatDistanceToNow(new Date(user.createdAt))}</h6>
            </div>

            <div className='simple-align'>
              <h6 className='account-mini-title'>Recipes posted: </h6>
              <h6 className='sub-title'>{user.posted_recipes.length}</h6>
            </div>
          </div>

          

          <div style={inputDisplay}>
          <h5 className='account-mini-title'>{user.username}</h5>
          <table>
            <tbody>
              <tr>
                <td>
                  <Form.Group controlId="formFile">
                    <Form.Label>Choose a new display picture:</Form.Label>
                    <Form.Control type="file" name="profile_picture" onChange={handleFileAttach} />
                  </Form.Group>
                </td>
                <td style={{verticalAlign: "bottom"}}>
                  <Button style={{padding: "0 0.3em", paddingBottom: "0.2em"}} variant='warning' title="Change Profile Picture" 
                    onClick={handleFileClick}>
                      <Icon.Pencil style={{fontSize: "large"}}/>
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <FloatingLabel controlId="floatingInputUsername" label="Edit username">
                    <Form.Control type="username" name="username" placeholder="Username" value={username} 
                      onChange={handleUsernameChange}/>
                  </FloatingLabel>
                </td>
                <td>
                  <Button style={{padding: "0 0.3em", paddingBottom: "0.2em"}} variant="warning" title="Change Username"
                    onClick={handleUsernameClick}>
                      <Icon.Pencil style={{fontSize: "large"}}/>
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <FloatingLabel controlId="floatingInputEmail" label="Edit email address" style={inputDisplay} >
                    <Form.Control type="email" name="email" placeholder="name@example.com" value={email} 
                      onChange={handleEmailChange} />
                  </FloatingLabel>
                </td>
                <td>
                <Button style={{padding: "0 0.3em", paddingBottom: "0.2em"}} variant="warning" title="Change Email Address" 
                  onClick={handleEmailClick}>
                    <Icon.Pencil style={{fontSize: "large"}}/>
                </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <PasswordInput PWinvalid={newPWinvalid} placeholder={"Enter new password"} textStyling={{marginTop: "-0.8em"}} 
                    handleChanges={handleNewPWChange}/>
                </td>
                <td style={{verticalAlign: "top"}}>
                  <Button style={{padding: "0 0.3em", paddingBottom: "0.2em"}} variant="warning" title="Change Password" 
                    onClick={handlePWClick}>
                      <Icon.Pencil style={{fontSize: "large"}}/>
                  </Button>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{textAlign: "center"}} >
                  <Button variant="success" onClick={handleEditSwitch}>Close</Button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>

          

          <br/>
          <br/>

          <Modal show={showModal} onHide={() => {setShowModal(false)}}>
            <Modal.Header closeButton />
            <Modal.Body>
              <p>Please enter your old password to verify this change:</p>
              <PasswordInput handleChanges={handleOldPWChange} PWinvalid={oldPWinvalid} placeholder={"Enter old password"}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {setShowModal(false)}}>
                Close
              </Button>
              <Button variant="success" onClick={handleOldPWClick}>
                Enter and Save
              </Button>
            </Modal.Footer>
          </Modal>
          
        </div>
      }
    </>

  )
}

export default MyAccount