import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DrinkCard from '../components/DrinkCard';
import { AuthContext } from '../context/AuthContext.js'
import { RecipesContext } from '../context/RecipesContext.js'

function Home() {
  const { user } = useContext(AuthContext);
  const { recipesList } = useContext(RecipesContext);

  return (
    <div className='simple-display'>
      <h1 className='page-title'>Homepage</h1>

      {!user && <p>
        Welcome to <strong style={{color: "#ffbc36"}}>Lemon Drop Drinks</strong>!
        This page is for flavour enthusiasts. Check out our recipes below for some quick inspiration, or 
        <Link to={"/sign-up"} style={{color: "#ffbc36", fontWeight: 700, textDecoration: "none"}}> sign up </Link> 
        to join our community of stirrers and shakers! 
      </p>}
      {user && <>
        <p>Welcome back, <strong style={{color: "#ffbc36"}}>{user.username}</strong> 🌞</p>
        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
          <button>Add Recipe</button>
          <button>Search</button>
        </div>
      </>}
       
      {!recipesList && <p>Looks like there's no recipes :(</p>}
      {recipesList && <>
        {recipesList.map((drink) => {
          return <DrinkCard key={drink._id} drink={drink} />
        })}
      </>}
    </div>
  )
}

export default Home