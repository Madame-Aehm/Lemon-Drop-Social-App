import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DrinkCard from '../components/DrinkCard';
import PageLoader from '../components/PageLoader';
import { AuthContext } from '../context/AuthContext.js'
import { RecipesContext } from '../context/RecipesContext.js'

function Home() {
  const { user } = useContext(AuthContext);
  const { recipesList, loading } = useContext(RecipesContext);
  console.log(user)

  return (
    <div className='simple-display'>
      {loading && <PageLoader/>}
      <h1 className='page-title'>Homepage</h1>

      {!user && <p>
        Welcome to <strong style={{color: "#ffbc36"}}>Lemon Drop Drinks</strong>!
        This page is for flavour enthusiasts. Check out our recipes below for some quick inspiration, or 
        <Link to={"/sign-up"} style={{color: "#ffbc36", fontWeight: 700, textDecoration: "none"}}> sign up </Link> 
        to join our community of stirrers and shakers! 🌞
      </p>}
      {user && <>
        <p>Welcome back, <strong style={{color: "#ffbc36"}}>{user.username}</strong> 🌞</p>
        <button style={{alignSelf: "flex-end", marginRight: "10em"}}>Search</button>
      </>}
       
      {!recipesList && <p>Looks like there's no recipes :(</p>}
      <div style={{width: "80vw", display: "flex", flexDirection: "column", gap: "1em"}}>
        {recipesList && <>
          {recipesList.map((drink) => {
            return <DrinkCard key={drink._id} drink={drink} />
          })}
        </>}
      </div>
    </div>
  )
}

export default Home