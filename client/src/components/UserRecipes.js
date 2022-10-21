import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button.js';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesContext.js'
import DrinkCard from './DrinkCard.js';
import { AuthContext } from '../context/AuthContext.js'


function UserRecipes({ userToView, filter }) {
  const { user } = useContext(AuthContext);
  const { recipesList } = useContext(RecipesContext);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (filter === "posted") {
      setUserList(recipesList.filter((recipe) => recipe.posted_by === userToView._id));
    } else if (filter === "favourites") {
      setUserList(recipesList.filter((recipe) => recipe.favourited_by.includes(userToView._id)));
    }
  }, [recipesList]);
  
  return (
    <>
      {userList && 
        <div className='simple-display'>
          {userList.length === 0 && <p>It looks like there aren't any recipes yet.</p>}
          {user && (user._id === userToView._id) && <Link className='link-button' to={'/new-recipe'}>Post a recipe!</Link>}
          {userList.length > 0 && 
            <>
              <div className='recipe-search'>
                <div>
                  {userList.map((drink) => {
                    return <DrinkCard key={drink._id} drink={drink} />
                  })}
                </div>
                <div className='search-bar'>
                  <Button>Search</Button>
                </div>
              </div>
            </>
          }
        </div>
      }
    </>
  )
}

export default UserRecipes