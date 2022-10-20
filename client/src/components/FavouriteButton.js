import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext.js'
import { RecipesContext } from '../context/RecipesContext.js'
import getToken from '../utils/getToken.js';
import { checkIf } from '../utils/JSFunctions.js';

function FavouriteButton({ recipe }) {

  const { user } = useContext(AuthContext);
  const { recipesList, setRecipesList } = useContext(RecipesContext);
  const poster = checkIf(recipe._id, user.posted_recipes);
  const [alreadyFavourite, setAlreadyFavourite] = useState(checkIf(recipe._id, user.favourite_recipes));

  const handleAddFav = async() => {
    const token = getToken();
    if ((!poster || !alreadyFavourite) && token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      const reqOptions = {
        method: "POST",
        headers: myHeaders,
      }
      try {
        const response = await fetch("http://localhost:5000/recipes/add-favourite/" + recipe._id, reqOptions);
        const result= await response.json();
        console.log(result);
        setAlreadyFavourite(true);

        const thisRecipe = recipesList.filter((item) => item._id === recipe._id);
        const thisRecipeIndex = recipesList.findIndex( item => item._id === recipe._id);
        const updated = thisRecipe[0].favourited_by.push(user._id);

        if (thisRecipeIndex !== -1) {
          const newArray = recipesList.splice(thisRecipeIndex, 1, updated);
          console.log(newArray);
          setRecipesList(newArray); //still trying to replace updated with outdated at array position.....
        }
      } catch(error) {
        alert("Problem adding favourite: " + error)
      }
    }
  }

  const handleRemoveFav = async() => {
    const token = getToken();
    if (alreadyFavourite && token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      const reqOptions = {
        method: "PATCH",
        headers: myHeaders
      }
      try {
        const response = await fetch("http://localhost:5000/recipes/delete-favourite/" + recipe._id, reqOptions);
        const result = await response.json();
        console.log(result);
        setAlreadyFavourite(false);
      } catch (error) {
        alert("Problem deleting favourite: " + error);
      }
    } 
  }
  

  return (
    <>
      {(user && !poster) && 
        <>
        {console.log(recipesList)}
          {alreadyFavourite && <button onClick={handleRemoveFav}>Delete Favourite</button>}
          {!alreadyFavourite && <button onClick={handleAddFav}>Add Favourite</button>}
        </>
      }
    </>
    
  )
}

export default FavouriteButton