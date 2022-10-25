import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesContext.js'
import DrinkCard from './DrinkCard.js';
import { AuthContext } from '../context/AuthContext.js'
import SortSelector from './SortSelector.js';


function UserRecipes({ userToView, filter }) {
  const { user } = useContext(AuthContext);
  const { recipesList, sort } = useContext(RecipesContext);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (recipesList && filter === "posted") {
      setUserList(recipesList.filter((recipe) => recipe.posted_by === userToView._id));
    } else if (recipesList && filter === "favourites") {
      setUserList(recipesList.filter((recipe) => recipe.favourited_by.includes(userToView._id)));
    }
  }, [recipesList, sort]);
  
  return (
    <div className='page-grid-4-1'>
      {userList.length === 0 && <p style={{textAlign: "center"}}>It looks like there aren't any recipes yet.</p>}
      {userList.length > 0 && 
        <div className='cards-container'>
            {userList.map((drink) => {
              return <DrinkCard key={drink._id} drink={drink} />
            })}
        </div>
      }
      <div className='search-column'>
        {user && (user._id === userToView._id) && <p><br/><Link className='link-button' to={'/new-recipe'}>Post a recipe!</Link></p>}
        <SortSelector />
      </div>
    </div>
  )
}

export default UserRecipes