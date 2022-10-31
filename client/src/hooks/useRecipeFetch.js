import { useEffect, useState } from 'react'
import { baseURL } from '../utils/getServerURL';

function useRecipeFetch(id) {
  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const getRecipe = async() => {
    try {
      const response = await fetch(baseURL + "/api/recipes/recipe/" + id);
      const result = await response.json();
      if (result.name) {
        setRecipe(result);
        setComments(result.comments);
      } else {
        setRecipe({ error: "Recipe not found" })
      }
      setLoading(false);
    } catch(error) {
      setError(error)
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
      getRecipe();
      console.log(recipe);
  }, [id]);

  return ({ recipe, comments, setComments, loading, setLoading, error })
}

export default useRecipeFetch