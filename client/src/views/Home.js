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
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
const DrinkCard =React.lazy(() => import('../components/DrinkCard'));

function Home() {
  const { user } = useContext(AuthContext);
  const { recipesList, loading, error } = useContext(RecipesContext);
  const [searchShow, setSearchShow] = useState(false);
  const [searchInput, setSearchInput] = useState({ name: "", method: "", ingredient: "" });
  const [searchResult, setSearchResult] = useState(null);
  const [mount, setMount] = useState(false);

  const handleSearchInputChanges = (e) => {
    setSearchInput({ ...searchInput, [e.target.name]: e.target.value});
  }

  const submitSearch = () => {
    console.log(searchInput);
    const filterResult = recipesList.filter((e) => {
      return (
        e.name.toLowerCase().includes(searchInput.name.trim().toLowerCase())
        && e.method.toLowerCase().includes(searchInput.method.trim().toLowerCase())
        // && e.ingredients.ingredient.toLowerCase().includes(searchInput.ingredient.trim().toLowerCase())
        )
        
    })
    console.log(filterResult);
    setSearchResult(filterResult);
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
              Welcome to <strong className='header-title'>Lemon Drop Drinks</strong>!
              This page is for flavour enthusiasts. Check out our recipes below for some quick inspiration, 
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

          <div className='d-flex justify-content-between'>
            <SortSelector searchResult={searchResult} setSearchResult={setSearchResult} />
            <span className='show-on-collapse'>
              <Button variant='success'>Search<Icon.ArrowBarRight style={{fontSize: "x-large"}}/></Button>
            </span>
          </div>

          <Card className='hide-on-collapse mt-4'>
            <Card.Body>
              <h5>Search:</h5>
              <Form.Text className='text-muted'>
                Fill out one or more fields and our faeries will find the best matches.
              </Form.Text>
              <br/>
              <Form.Label htmlFor='search-name'>Drink Name:</Form.Label>
              <Form.Control className='mb-2' type='text' id='search-name' value={searchInput.name} name='name' onChange={handleSearchInputChanges} />
              <Form.Label htmlFor='search-method'>Method:</Form.Label>
              <Form.Control className='mb-2' type='text' id='search-method' value={searchInput.method} name='method' onChange={handleSearchInputChanges} />
              <Form.Label htmlFor='search-ingredient'>Includes ingredient:</Form.Label>
              <Form.Control type='text' id='search-ingredient' name='ingredient' value={searchInput.ingredient} onChange={handleSearchInputChanges} />
              <Form.Text className='text-muted'>Please only type one ingredient</Form.Text>
              <br/>
              <Button className='mb-3' variant='success' onClick={submitSearch}>Search</Button>
              {searchResult && <Button className='mb-3 ms-3' variant='warning' onClick={clearSearch}>Clear Search</Button>}
            </Card.Body>
          </Card>
          
          
        </div>
      </div>
    </Fade>
  )
}

export default Home