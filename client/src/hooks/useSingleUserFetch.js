import { useEffect, useState } from 'react'

function useSingleUserFetch(id) {
  const [userToView, setUserToView] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchById = async() => {
    setLoading(true);
    try{
      const response = await fetch("http://localhost:5000/api/users/user/" + id);
      const result = await response.json();
      if (result.username) {
        setUserToView(result);
      } else {
        setUserToView({ error: "User not found" });
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      alert("Problem retrieving user account: " + error);
    }
  }

  useEffect(() => {
    fetchById();
  }, [id])
  

  return ({ userToView, loading, error })
}

export default useSingleUserFetch