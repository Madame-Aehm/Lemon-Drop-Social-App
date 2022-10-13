import React, { useState } from 'react'
import '../css/newRecipe.css';
import Button from 'react-bootstrap/Button';

function NewRecipe() {

  const [ingredientsList, setIngredientsList] = useState([{ ingredient: "", quantity: 0, measure: "" }]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleIngredientChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...ingredientsList];
    list[i][name] = value;
    setIngredientsList(list);
  }

  const handleIngredientRemove = (i) => {
    const list = [...ingredientsList];
    list.splice(i, 1);
    setIngredientsList(list);
  }

  const handleAddIngredient = () => {
    setIngredientsList([{ ingredient: "", quantity: 0, measure: "" }, ...ingredientsList]);
  }

  return (
    <div className='simple-display'>
      <h1 className='page-title'>New Recipe</h1>
      <div style={{textAlign: "center", background: "rgba(148,211,51,0.3)", color: "#1b8f47", padding: "0.5em", borderRadius: "1em", width: "80%"}}>
        <q>I've come up with a new recipeeh!</q> - Ignis Scientia
      </div>

      <div className='form-container'>

        <div className='one-line'>
          <label htmlFor='drink-name'>Name:</label>
          <input name='drink-name' id='drink-name' placeholder='Enter a name for your drink' style={{width: "100%"}}/>
        </div>

        <hr/>

        <div className='one-line'>
          <label htmlFor='method'>Method:</label>
          <input name='method' id='method' placeholder='Enter a name for your drink' style={{width: "100%"}}/>
        </div>

        <hr/>

        <div>
          <label style={{minWidth: "5em"}}>Image:</label>
          <label className='image-upload' htmlFor='image' onClick={{handleFileChange}}>Choose a file</label>
          <label style={{marginLeft: "1em", minWidth: "5em"}}>File: </label>
          {selectedFile && <p>{selectedFile.name}</p>}
          {!selectedFile && <p>No file selected</p>}
          <input name='image' id='image' type={"file"} style={{display: "none"}}/>
        </div>

        <hr/>

        <div className='ingredients-container'>
          <p style={{marginBottom: "0.3em"}}>
            Enter the ingredients that used in your recipe. Include the name of the ingredient, the quantity, 
            and which measurement system you're using (eg. mL, dash, parts, etc.)
          </p>
          {ingredientsList.map((input, i) => {
            return (
              <div key={i} className='ingredient-box'>
                <label>Ingredient{i + 1}</label>
                <input name='ingredient' value={input.ingredient} placeholder='Ingredient name'
                  onChange={(e) => handleIngredientChange(e, i)} />
                <input name='quantity' value={input.quantity} type={"number"} placeholder='?'
                  onChange={(e) => handleIngredientChange(e, i)} />
                <input name='measure' value={input.measure} placeholder='Measure'
                  onChange={(e) => handleIngredientChange(e, i)} />
                {ingredientsList.length > 1 && <Button variant='danger' style={{alignSelf: "flex-end"}}
                  onClick={() => handleIngredientRemove(i)} >Remove</Button>}
              </div>
            );
          })}
          <Button variant='success' onClick={handleAddIngredient}>Add</Button>
        </div>

        <hr/>
      </div>


      

    </div>
  )
}

export default NewRecipe