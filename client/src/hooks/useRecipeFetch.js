import { useEffect, useState } from 'react'

function useRecipeFetch(id) {
  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([{ ingredient: "", quantity: 0, measure: "" }]);
  const [stepsList, setStepsList] = useState([""]);
  const [inputInfo, setInputInfo] = useState({});

  const getRecipe = async() => {
    try {
      const response = await fetch("http://localhost:5000/recipes/" + id);
      const result = await response.json();
      console.log(result);
      setRecipe(result);
      setComments(result.comments);
      setIngredientsList(result.ingredients);
      setStepsList(result.instructions);
      setInputInfo({ name: result.name, method: result.method })
      setLoading(false);
    } catch(error) {
      setError(error)
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
      getRecipe();
  }, [id]);

  return ({ 
    recipe, 
    ingredientsList, 
    setIngredientsList, 
    stepsList, 
    setStepsList, 
    inputInfo, 
    setInputInfo, 
    comments, 
    setComments, 
    loading, 
    setLoading, 
    error })
}

export default useRecipeFetch