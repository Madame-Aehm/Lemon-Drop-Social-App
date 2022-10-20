import { useEffect, useState } from 'react'

function useSingleUserFetch(id) {
  const [userToView, setUserToView] = useState({});

  const fetchById = async() => {
    try{
      const response = await fetch("http://localhost:5000/users/user/" + id);
      const result = await response.json();
      setUserToView(result);
    } catch (error) {
      alert("Problem retrieving user account: " + error)
    }
  }

  useEffect(() => {
    fetchById();
    console.log(userToView)
  }, [id])
  

  return ({ userToView })
}

export default useSingleUserFetch