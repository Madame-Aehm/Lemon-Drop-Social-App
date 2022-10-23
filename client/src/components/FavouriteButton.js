import React, { useContext, useEffect, useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { AuthContext } from '../context/AuthContext.js'
import { RecipesContext } from '../context/RecipesContext.js'
import { addFavourite, removeFavourite } from '../utils/favouritesManagement.js';
import { checkIf, resetSubArray } from '../utils/JSFunctions.js';

function FavouriteButton({ recipe }) {

  const { user, setUser } = useContext(AuthContext);
  const { recipesList, setRecipesList } = useContext(RecipesContext);
  const [poster, setPoster] = useState(false);
  const [alreadyFavourite, setAlreadyFavourite] = useState(false);

  const handleAddFav = async() => {
    if (!poster && !alreadyFavourite) {
      try {
        addFavourite(recipe);
        setAlreadyFavourite(true);
        const thisRecipeIndex = recipesList.findIndex( item => item._id === recipe._id);
        recipesList[thisRecipeIndex].favourited_by.push(user._id);
        setRecipesList(recipesList); 
        user.favourite_recipes.push(recipe._id);
        setUser(user);
      } catch(error) {
        alert("Problem adding favourite: " + error)
      }
    }
  }

  const handleRemoveFav = async() => {
    if (alreadyFavourite) {
      try {
        await removeFavourite(recipe);
        setAlreadyFavourite(false);
        const thisRecipeIndex = recipesList.findIndex( item => item._id === recipe._id);
        resetSubArray(recipesList[thisRecipeIndex].favourited_by, user._id);
        setRecipesList(recipesList);
        resetSubArray(user.favourite_recipes, recipe._id);
        setUser(user);
      } catch (error) {
        alert("Problem deleting favourite: " + error);
      }
    } 
  }

  useEffect(() => {
    if (user) {
      setPoster(checkIf(recipe._id, user.posted_recipes));
      setAlreadyFavourite(checkIf(recipe._id, user.favourite_recipes));
    }
  }, [])

  const buttonStyle = {
    backgroundColor: "white",
    padding: "0.4em 0.5em",
    borderRadius: "50%",
    border: "none",
    color: "#DE4940"
  }

  return (
    <>
      {(user && !poster) && 
        <>
          {alreadyFavourite && 
            <span style={buttonStyle} title="Remove from favourites" onClick={handleRemoveFav}>
              <Icon.HeartFill style={{fontSize: "large"}}/>
            </span>}
          {!alreadyFavourite && 
            <span style={buttonStyle} title="Add to favourites" onClick={handleAddFav}>
              <Icon.Heart style={{fontSize: "large"}}/>
            </span>}
        </>
      }
    </>
    
  )
}

export default FavouriteButton