import React, { createContext, useEffect, useState } from 'react';

export const RecipesContext = createContext();

export const RecipesContextProvider = (props) => {
  const [recipesList, setRecipesList] = useState(null);

  const fetchAllRecipes = async () => {
    const response = await fetch("http://localhost:5000/recipes/")
    const data = await response.json()
    console.log(data)
    setRecipesList(data);
  }

  useEffect(() => {
    fetchAllRecipes();
  }, [])


  return (
    <RecipesContext.Provider value={{ recipesList }}>
      { props.children }
    </RecipesContext.Provider>
  )
}