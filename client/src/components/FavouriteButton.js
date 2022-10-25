import React, { useContext, useEffect, useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import Button from 'react-bootstrap/esm/Button.js';
import { AuthContext } from '../context/AuthContext.js'
import { RecipesContext } from '../context/RecipesContext.js'
import { addFavourite, removeFavourite } from '../utils/favouritesManagement.js';
import { checkIf, resetSubArray } from '../utils/JSFunctions.js';

function FavouriteButton({ recipe, includeCount }) {

  const { user, setUser } = useContext(AuthContext);
  const { recipesList, setRecipesList } = useContext(RecipesContext);
  const [poster, setPoster] = useState(false);
  const [alreadyFavourite, setAlreadyFavourite] = useState(false);
  const [favCount, setFavCount] = useState(recipe.favourited_by.length);

  const handleAddFav = async() => {
    if (!poster && !alreadyFavourite) {
      try {
        addFavourite(recipe);
        setAlreadyFavourite(true);
        setFavCount(prev => prev + 1);
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
        setFavCount(prev => prev - 1);
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

  return (
    <>
      {(user && !poster) && 
        <>
          {alreadyFavourite && 
            <Button className='fav-hover' variant='light' title="Remove from favourites" onClick={handleRemoveFav}>
              <Icon.HeartFill style={{fontSize: "large", color: "#DE4940"}}/> x {favCount}
            </Button>
          }
          {!alreadyFavourite && 
            <Button className='fav-hover' variant='light' title="Add to favourites" onClick={handleAddFav}>
                <Icon.Heart style={{fontSize: "large", color: "#DE4940"}}/>  x {favCount}
            </Button>
            }
        </>
      }
    </>
    
  )
}

export default FavouriteButton