import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PageLoader from '../components/PageLoader';
import { RecipesContext } from '../context/RecipesContext.js'
import RecipeForm from '../components/RecipeForm';
import getToken from '../utils/getToken';
import { deleteImage, recipeUpdateImage } from '../utils/imageMangement';

function UpdateRecipe() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { recipe } = location.state;
   
  const [ingredientsList, setIngredientsList] = useState([{ ingredient: "", quantity: 0, measure: "" }]);
  const [stepsList, setStepsList] = useState([""]);
  const [name, setName] = useState("");
  const [method, setMethod] = useState("");
  const { recipesList, setRecipesList } = useContext(RecipesContext);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
     setIngredientsList(recipe.ingredients);
     setStepsList(recipe.instructions);
     setName(recipe.name);
     setMethod(recipe.method);
     setLoading(false);
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const token = getToken();
    if (token) {
      try {
        const image = await recipeUpdateImage(selectedFile, recipe.image);
        if (!image.error) {
          const recipeObject = { 
            name: name,
            method: method,
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
              method: "PATCH",
              headers: myHeaders,
              body: toSubmit
            }
            const response = await fetch("http://localhost:5000/recipes/update-recipe/" + recipe._id, reqOptions);
            const result = await response.json();
            if (!result.error) {
              if (selectedFile && recipe.image.public_id) {
                await deleteImage(recipe.image);
              }
              const updateList = recipesList.filter((item) => item._id !== result._id);
              setRecipesList([result].concat(updateList));
              setLoading(false);
              alert("Recipe updated!")
            }
          } catch (error) {
            setLoading(false);
            alert("Error updating recipe: " + error);
          }
        }
      } catch (error) {
        setLoading(false);
        alert("Error uploading image: " + error);
      }
    } else {
      alert("No user token?")
    }
  }

  return (
    <div className='simple-display'>
      {loading && <PageLoader/>}
      <h1 className='page-title'>Edit Recipe</h1>
      {recipe && 
        <RecipeForm setSelectedFile={setSelectedFile} name={name} setName={setName} method={method} setMethod={setMethod} ingredientsList={ingredientsList} 
          setIngredientsList={setIngredientsList} stepsList={stepsList} setStepsList={setStepsList} handleSubmit={handleSubmit} />
      }
    </div>
  )
}

export default UpdateRecipe