import React, { createContext, useEffect, useState } from 'react';
import getToken from '../utils/getToken';

export const RecipesContext = createContext();

export const RecipesContextProvider = (props) => {
  const [recipesList, setRecipesList] = useState(null);

  const fetchAllRecipes = async () => {
    const response = await fetch("http://localhost:5000/recipes/")
    const data = await response.json()
    setRecipesList(data);
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

  useEffect(() => {
    fetchAllRecipes();
  }, [])


  return (
    <RecipesContext.Provider value={{ recipesList, setRecipesList, deleteRecipe }}>
      { props.children }
    </RecipesContext.Provider>
  )
}