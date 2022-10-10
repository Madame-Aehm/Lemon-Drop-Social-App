import React, { useContext, useEffect, useState } from 'react'
import editIcon from "../edit.png";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/esm/Button';
import getToken from '../utils/getToken'
import { AuthContext } from '../context/AuthContext.js'

function MyAccount() {
  const { user, setUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [inputs, setInputs] = useState("none");
  const [hideOnEdit, setHideOnEdit] = useState("block");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

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
      setInputs("block");
      setHideOnEdit("none");
    } else {
      setInputs("none");
      setHideOnEdit("flex");
    }
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
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
    display: inputs
  }

  const currentDisplay = {
    display: hideOnEdit
  }

  return (
    <>
      {user && 
        <div className='simple-display'>

          <div className='simple-align'>
            <h4 className='sub-title'>Account Details</h4>
            <img style={{width: "1.5em", height: "1.5em", cursor: "pointer"}} 
                src={editIcon} 
                title="Edit Account Details"
                onClick={handleEditSwitch}
                alt="Edit Account Icon"/>
          </div>

          <img className='profile-img' src={user.profile_picture.url} alt={`${user.username}'s profile`}/>

          <h5 className='account-mini-title' style={currentDisplay}>{user.username}</h5>

          <div style={currentDisplay} className='simple-align'>
            <h6 className='account-mini-title'>Email: </h6>
            <h6 className='sub-title'>{user.email}</h6>
          </div>

          <div style={currentDisplay} className='simple-align'>
            <h6 className='account-mini-title'>User since: </h6>
            <h6 className='sub-title'>{user.createdAt}</h6>
          </div>

          <div style={currentDisplay} className='simple-align'>
            <h6 className='account-mini-title'>Recipes posted: </h6>
            <h6 className='sub-title'>{user.posted_recipes.length}</h6>
          </div>

          <table style={inputDisplay}>
            <tbody>
              <tr>
                <td>
                  <Form.Group controlId="formFile">
                    <Form.Label>Choose a new display picture:</Form.Label>
                    <Form.Control type="file" name="profile_picture" />
                  </Form.Group>
                </td>
                <td style={{verticalAlign: "bottom"}}>
                  <Button variant="warning" style={{alignSelf: "flex-end"}}>edit</Button>
                </td>
              </tr>
              <tr>
                <td>
                  <FloatingLabel controlId="floatingInputUsername" label="Edit username">
                    <Form.Control type="username" name="username" placeholder="Username" value={username} onChange={handleUsernameChange}/>
                  </FloatingLabel>
                </td>
                <td>
                  <Button variant="warning" style={{alignSelf: "flex-end"}} onClick={() => updateUser({username: username})}>edit</Button>
                </td>
              </tr>
              <tr>
                <td>
                  <FloatingLabel controlId="floatingInputEmail" label="Edit email address" style={inputDisplay} >
                    <Form.Control type="email" name="email" placeholder="name@example.com" value={email} onChange={handleEmailChange} />
                  </FloatingLabel>
                </td>
                <td>
                  <Button variant="warning" style={{alignSelf: "flex-end"}}>edit</Button>
                </td>
              </tr>
            </tbody>
          </table>

          <Button variant="success" style={inputDisplay} onClick={handleEditSwitch}>Close</Button>

          <br/>
          <br/>
          
        </div>
      }
    </>

  )
}

export default MyAccount