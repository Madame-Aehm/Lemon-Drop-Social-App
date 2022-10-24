import React, { Suspense, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageLoader from '../components/PageLoader';
import { AuthContext } from '../context/AuthContext.js'
import { RecipesContext } from '../context/RecipesContext.js'
import Fade from 'react-bootstrap/Fade';
import PlaceholderCard from '../components/PlaceholderCard';
import SortSelector from '../components/SortSelector';
const DrinkCard =React.lazy(() => import('../components/DrinkCard'));

function Home() {
  const { user } = useContext(AuthContext);
  const { recipesList, loading } = useContext(RecipesContext);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, [])

  return (
    <Fade in={mount}>
      <div className='page-grid-4-1'>
        {loading && <PageLoader/>}
        {(!recipesList || recipesList === 0) && <p>Looks like there's no recipes :(</p>}
        <div className='cards-container'>
          {recipesList && <>
            {recipesList.map((drink) => {
              return (
              <>
                <Suspense key={drink._id} fallback={<PlaceholderCard/>}>
                  <DrinkCard drink={drink} />
                </Suspense>
              </>)
            })}
          </>}
        </div>
        <div className='search-column'>
          {!user &&
            <p>
              Welcome to <strong className='header-title'>Lemon Drop Drinks</strong>!
              This page is for flavour enthusiasts. Check out our recipes below for some quick inspiration, 
              or <Link to={"/sign-up"} className='p-link'>sign up</Link> to join our community of stirrers and shakers!
              You'll be able to submit your own recipes, post comments, and save your favourites! 🌞
            </p>
          }
          {user && 
            <p>
              Welcome to <strong className='header-title'>Lemon Drop Drinks</strong>!
              Your home as a flavour enthusiast 🌞
            </p>
          }
          <p><Link className='link-button' to={'/new-recipe'}>Post a recipe!</Link></p>
          <SortSelector />
          {console.log(recipesList)}


          
        </div>
      </div>
    </Fade>
  )
}

export default Home