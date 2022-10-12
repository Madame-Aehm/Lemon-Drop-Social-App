import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

function PasswordInput({ handleChanges, PWinvalid, styling, textStyling, placeholder }) {
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
  return (
    <>
      <InputGroup hasValidation style={styling}>
        <Form.Control type={passwordVisibility} name="password" placeholder={placeholder} onChange={handleChanges} 
          isInvalid={PWinvalid} autoComplete={"off"} required/>
        <Button onClick={passwordToggle} variant="outline-success" id="button-addon2">
        {showOrHide}
        </Button>
        <Form.Control.Feedback type="invalid">
          Password must be at least 6 characters, include at least one number, and mix capital and lowercase letters.
        </Form.Control.Feedback>
      </InputGroup>
      {!PWinvalid && 
        <Form.Text muted style={textStyling}>Password must be at least 6 characters, include at least one number, and mix capital and lowercase letters.</Form.Text>
      }
    </>
  )
}

export default PasswordInput