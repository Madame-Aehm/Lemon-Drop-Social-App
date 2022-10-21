import { useEffect, useState } from 'react'

function useRecipeFetch(id) {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const getRecipe = async() => {
    try {
      const response = await fetch("http://localhost:5000/recipes/" + id);
      const result = await response.json();
      console.log(result);
      setRecipe(result);
      setComments(result.comments);
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

  return ({ recipe, comments, setComments, loading, setLoading, error })
}

export default useRecipeFetch