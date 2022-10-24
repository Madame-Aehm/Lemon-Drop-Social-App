import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import getToken from '../utils/getToken';
import { deleteImage } from '../utils/imageMangement';
import { resetSubArray } from '../utils/JSFunctions.js';
import arraySort from 'array-sort';

export const RecipesContext = createContext();

export const RecipesContextProvider = (props) => {
  const [recipesList, setRecipesList] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);
  const [sort, setSort] = useState("newest");

  const fetchAllRecipes = async () => {
    const response = await fetch("http://localhost:5000/recipes/")
    const data = await response.json()
    setRecipesList(data);
    setLoading(false);
  }

  const deleteRecipe = async (id) => {
    const token = getToken();
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("Content-Type", "application/json");
      const toSubmit = JSON.stringify({ _id: id });
      const reqOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: toSubmit
      }
      try {
        const response = await fetch("http://localhost:5000/recipes/delete-recipe", reqOptions);
        const result = response.json();
        return result;
      } catch (error) {
        return ({ error: error });
      }
    }
  }

  const handleDeleteRecipe = async (drink) => {
    if (window.confirm("You're sure you want to delete this recipe? This is cannot be undone.")) {
      try {
        const deleted = await deleteRecipe(drink._id);
        setRecipesList(recipesList.filter(e => e._id !== drink._id));
        resetSubArray(user.posted_recipes, drink._id);
        setUser(user);
        if (drink.image.public_id) {
          try {
            await deleteImage(drink.image);
          } catch (error) {
            console.log("Recipe deleted, but problem deleting image: ", error);
          }
        }
        alert(deleted.msg);
      } catch (error) {
        alert("Something went wrong: " + error);
      }
    }
  }

  useEffect(() => {
    fetchAllRecipes();
  }, [])

  useEffect(() => {
    if (recipesList && sort === "newest") {
      setRecipesList(arraySort(recipesList, 'createdAt'));
    }
    if (recipesList && sort === "oldest") {
      setRecipesList(arraySort(recipesList, 'createdAt', { reverse: true }));
    }
    if (recipesList && sort === "popular") {
      setRecipesList(arraySort(recipesList, 'favourited_by.length'));
    }
    if (recipesList && sort === "recently-updated") {
      setRecipesList(arraySort(recipesList, 'updatedAt'));
    } 
  }, [sort]);

  return (
    <RecipesContext.Provider value={{ recipesList, setRecipesList, deleteRecipe, handleDeleteRecipe, loading, sort, setSort }}>
      { props.children }
    </RecipesContext.Provider>
  )
}