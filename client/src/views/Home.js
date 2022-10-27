import React, { Suspense, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageLoader from '../components/PageLoader';
import { AuthContext } from '../context/AuthContext.js'
import { RecipesContext } from '../context/RecipesContext.js'
import Fade from 'react-bootstrap/Fade';
import PlaceholderCard from '../components/PlaceholderCard';
import SortSelector from '../components/SortSelector';
import Button from 'react-bootstrap/esm/Button';
import * as Icon from 'react-bootstrap-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SearchForm from '../components/SearchForm';
const DrinkCard =React.lazy(() => import('../components/DrinkCard'));

function Home() {
  const { user } = useContext(AuthContext);
  const { recipesList, loading, error } = useContext(RecipesContext);
  const [searchInput, setSearchInput] = useState({ name: "", method: "", ingredient: "" });
  const [searchResult, setSearchResult] = useState(null);
  const [mount, setMount] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitSearch = () => {
    const filterResult = recipesList.filter((e) => {
      return (
        e.name.toLowerCase().includes(searchInput.name.trim().toLowerCase())
        && e.method.toLowerCase().includes(searchInput.method.trim().toLowerCase())
        && e.ingredients.some(i => searchInput.ingredient.toLowerCase().includes(i.ingredient.toLowerCase()))
        )
    })
    setSearchResult(filterResult);
    handleClose();
  }

  const clearSearch = () => {
    setSearchResult(null);
    setSearchInput({ name: "", method: "", ingredient: "" });
  }

  useEffect(() => {
    setMount(true);
  }, [])

  return (
    <Fade in={mount}>
      <div className='page-grid-4-1'>
        {loading && <PageLoader/>}
        {recipesList.length === 0 && <p>Looks like there's no recipes :(</p>}
        {error && <p>Something went wrong: {error}</p>}

        <div className='d-flex flex-column align-items-center'>
          <div className='cards-container mb-3'>
            {(recipesList && !searchResult) && <>
              {recipesList.map((drink) => {
                return (
                  <Suspense key={drink._id} fallback={<PlaceholderCard/>}>
                    <DrinkCard drink={drink} />
                  </Suspense>
                )
              })}
            </>}
            {searchResult && 
            <>
              {searchResult.length === 0 && <p>Looks like there were no matches :(</p>}
              {searchResult.length > 0 &&
                searchResult.map((drink) => {
                  return (
                    <Suspense key={drink._id} fallback={<PlaceholderCard/>}>
                      <DrinkCard drink={drink} />
                    </Suspense>
                  )
                })
              }
            </>}
          </div>
          {searchResult && <Button variant='warning' onClick={clearSearch}>Clear Search</Button>}
        </div>
       

        <div className='search-column'>
          {!user &&
            <p className='mb-2'>
              Welcome to <strong className='header-title'>lemon drop recipes</strong>!
              This page is for flavour enthusiasts. Check out our recipe collection for some quick inspiration, 
              or <Link to={"/sign-up"} className='p-link'>sign up</Link> to join our community of stirrers and shakers!
              You'll be able to submit your own recipes, post comments, and save your favourites! 🌞
            </p>
          }
          {user && <>
            <p className='mb-2'>
              Welcome to <strong className='header-title'>Lemon Drop Drinks</strong>!
              Your home as a flavour enthusiast 🌞
            </p>
            {/* <p className='hide-on-collapse'><Link className='link-button' to={'/new-recipe'}>Post a recipe!</Link></p> */}
          </>}

          <div className='sort-search-container'>
            <SortSelector searchResult={searchResult} setSearchResult={setSearchResult} />
            <div className='show-on-collapse'>
              <Button variant='success' onClick={handleShow}>Search<Icon.ArrowBarRight style={{fontSize: "x-large"}}/></Button>
            </div>
          </div>

          <div className='hide-on-collapse'>
            <SearchForm searchInput={searchInput} setSearchInput={setSearchInput} searchResult={searchResult} submitSearch={submitSearch}
              clearSearch={clearSearch} />
          </div>

          <Offcanvas placement='end' show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton />
            <Offcanvas.Body>
              <SearchForm searchInput={searchInput} setSearchInput={setSearchInput} searchResult={searchResult} submitSearch={submitSearch}
                clearSearch={clearSearch} />
            </Offcanvas.Body>
          </Offcanvas>
          
        </div>
      </div>
    </Fade>
  )
}

export default Home