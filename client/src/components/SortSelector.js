import React, { useContext } from 'react'
import { RecipesContext } from '../context/RecipesContext.js'
import Form from 'react-bootstrap/Form';


function SortSelector() {
  const { setSort } = useContext(RecipesContext);


  const handleOnChange = (e) => {
    setSort(e.target.value);
  }

  return (
    <>
      <label>Sort recipes by:</label>
      <Form.Select onChange={handleOnChange}>
        <option value={"newest"}>Newest</option>
        <option value={"oldest"}>Oldest</option>
        <option value={"popular"}>Popular</option>
        <option value={"recently-updated"}>Recently Updated</option>
      </Form.Select>
    </>
    
  )
}

export default SortSelector