import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function RecipeForm({ 
  setSelectedFile,
  name,
  setName,
  method,
  setMethod,
  ingredientsList,
  setIngredientsList,
  stepsList,
  setStepsList,
  handleSubmit }) {

  const handleFileAttach = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
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
    setIngredientsList([...ingredientsList, { ingredient: "", quantity: 0, measure: "" }]);
  }

  const handleStepsChange = (e, i) => {
    const { value } = e.target;
    const list = [...stepsList];
    list[i] = value;
    setStepsList(list);
  }

  const handleStepsRemove = (i) => {
    const list = [...stepsList];
    list.splice(i, 1);
    setStepsList(list);
  }

  const handleAddStep = () => {
    setStepsList([...stepsList, ""]);
  }

  return (
    <Form id='recipe-form' className='d-flex flex-column' style={{border: "solid 1px rgba(0,0,0,0.3)", borderRadius: "0.3em", padding: "1em"}} 
      onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label className='new-rec-label'>Drink Name:</Form.Label>
          <Form.Control name='name' placeholder="Enter a name for your drink" spellCheck="false" value={name} onChange={handleNameChange} required/>
        </Form.Group>

        <hr/>

        <Form.Group >
          <Form.Label className='new-rec-label'>Method:</Form.Label>
          <Form.Control name='method' placeholder="Enter the preparation method" value={method} onChange={handleMethodChange} required/>
        </Form.Group>

        <hr/>

        <Form.Group controlId="formFile">
          <Form.Label className='new-rec-label'>Upload an image:</Form.Label>
          <Form.Control type="file" name="image" onChange={handleFileAttach} />
        </Form.Group>

        <hr/>

        <div>
          <Form.Label className='new-rec-label'>Ingredients:</Form.Label>
          <p style={{marginBottom: "0.3em"}}>
            Enter the ingredients used in your recipe. Include the name of the ingredient, the quantity, 
            and which measurement system you're using (eg. ml, dash, parts, etc.)
          </p>
          {ingredientsList.map((input, i) => {
            return (
              <div key={"ingredientInput" + i} className='box'>
                <label className='new-rec-label'>Ingredient{i + 1}</label>
                <input name='ingredient' value={input.ingredient} placeholder='Ingredient name'
                  onChange={(e) => handleIngredientChange(e, i)} required/>
                <input name='quantity' value={input.quantity} type={"number"} placeholder='?'
                  onChange={(e) => handleIngredientChange(e, i)} required/>
                <input name='measure' value={input.measure} placeholder='Measure'
                  onChange={(e) => handleIngredientChange(e, i)} required/>
                {ingredientsList.length > 1 && <Button variant='danger' style={{alignSelf: "flex-end"}}
                  onClick={() => handleIngredientRemove(i)} >Remove</Button>}
              </div>
            );
          })}
          <Button variant='success' onClick={handleAddIngredient}>Add Ingredient</Button>
        </div>

        <hr/>

        <div>
          <Form.Label className='new-rec-label'>Recipe instructions:</Form.Label>
          <p style={{marginBottom: "0.3em"}}>
            Explain step by step how to prepare your drink.
          </p>
          {stepsList.map((input, i) => {
            return (
              <div key={"stepsInput" + i} className='box'>
                <label className='new-rec-label'>Step{i + 1}</label>
                <textarea name='step' value={input} placeholder='Write instructions here' style={{width: "100%"}}
                  onChange={(e) => handleStepsChange(e, i)} required/>
                {stepsList.length > 1 && <Button variant='danger' style={{alignSelf: "flex-end"}}
                  onClick={() => handleStepsRemove(i)} >Remove</Button>}
              </div>
            );
          })}
          <Button variant='success' onClick={handleAddStep}>Add Step</Button>
        </div>

        <hr/>

        <Button variant='success' type='submit'>Submit</Button>

    </Form>
  )
}

export default RecipeForm