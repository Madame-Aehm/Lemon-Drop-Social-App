import React, { useContext, useState } from 'react'
import '../css/newRecipe.css';
import { deleteImage, recipeImageUpload } from '../utils/imageMangement';
import { RecipesContext } from '../context/RecipesContext.js'
import getToken from '../utils/getToken';
import PageLoader from '../components/PageLoader';
import RecipeForm from '../components/RecipeForm';

function NewRecipe() {

  const { recipesList, setRecipesList } = useContext(RecipesContext);
  const [loading, setLoading] = useState(false);
  const [ingredientsList, setIngredientsList] = useState([{ ingredient: "", quantity: 0, measure: "" }]);
  const [stepsList, setStepsList] = useState([""]);
  const [inputInfo, setInputInfo] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const token = getToken();
    if (token) {
      const image = await recipeImageUpload(selectedFile);
      if (!image.error) {
        const recipeObject = { 
          ...inputInfo, 
          ingredients: ingredientsList, 
          instructions: stepsList, 
          image: image,
        };
        try {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer " + token);
          myHeaders.append("Content-Type", "application/json");
          const toSubmit = JSON.stringify(recipeObject);
          const reqOptions = {
            method: "POST",
            headers: myHeaders,
            body: toSubmit,
          }
          const response = await fetch("http://localhost:5000/recipes/new-recipe", reqOptions);
          const result = await response.json();
          if (!result.error) {
            console.log(result);
            resetForm();
            setRecipesList([result].concat(recipesList));
            setLoading(false);
            alert("Recipe added to the collection!")
          } else {
            if (image.public_id) {
              deleteImage(image);
            }
            setLoading(false);
            alert("Something went wrong adding recipe to collection: " + result.error)
          }
        } catch (error) {
          if (image.public_id) {
            deleteImage(image);
          }
          setLoading(false);
          alert("Something went wrong adding recipe to collection: " + error)
        }
      } else {
        setLoading(false);
        alert("Error uploading image");
      }
    }
  }

  function resetForm() {
    setIngredientsList([{ ingredient: "", quantity: 0, measure: "" }]);
    setStepsList([""]);
    setInputInfo({})
    setSelectedFile(null);
    const recipeForm = document.getElementById('recipe-form');
    recipeForm.reset();
  }

  return (
    <div className='simple-display'>
      {loading && <PageLoader/>}
      <h1 className='page-title'>New Recipe</h1>
      <div style={{textAlign: "center", background: "rgba(148,211,51,0.3)", color: "#1b8f47", padding: "0.5em", borderRadius: "1em", width: "80%"}}>
        <q>I've come up with a new recipeeh!</q> - Ignis Scientia
      </div>

      <RecipeForm setSelectedFile={setSelectedFile} inputInfo={inputInfo} setInputInfo={setInputInfo} ingredientsList={ingredientsList} 
        setIngredientsList={setIngredientsList} stepsList={stepsList} setStepsList={setStepsList} handleSubmit={handleSubmit} />

    </div>
  )
}

export default NewRecipe