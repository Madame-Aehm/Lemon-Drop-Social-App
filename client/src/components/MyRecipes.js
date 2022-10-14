import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js'
import { RecipesContext } from '../context/RecipesContext.js'
import DrinkCard from './DrinkCard.js';


function MyRecipes() {
  const { recipesList } = useContext(RecipesContext);
  const { user } = useContext(AuthContext);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    setMyList(recipesList.filter((recipe) => recipe.posted_by === user._id));
  }, [recipesList]);
  
  return (
    <>
      {myList && 
        <div className='simple-display'>
          {myList.length === 0 && <p>It looks like you haven't posted any recipes yet. Give it a shot!</p>}
          <Link className='link-button' to={'/new-recipe'}>Post a recipe!</Link>
          {myList.length > 0 && 
            <>
              <Button>Search</Button>
              <div className='recipe-search'>
                <div>
                  {myList.map((drink) => {
                    return <DrinkCard key={drink._id} drink={drink} myList={myList} setMyList={setMyList} />
                  })}
                </div>
                <div className='search-bar'>
                  <p>testing</p>
                </div>
              </div>
            </>
          }
        </div>
      }
    </>
  )
}

export default MyRecipes