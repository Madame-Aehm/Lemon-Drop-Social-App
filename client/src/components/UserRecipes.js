import React, { Suspense, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesContext.js'
import DrinkCard from './DrinkCard.js';
import { AuthContext } from '../context/AuthContext.js'
import SortSelector from './SortSelector.js';
import PageLoader from './PageLoader.js';
import PlaceholderCard from './PlaceholderCard.js';
import Button from 'react-bootstrap/esm/Button.js';
import * as Icon from 'react-bootstrap-icons';
import SearchForm from './SearchForm.js';
import Offcanvas from 'react-bootstrap/Offcanvas';

function UserRecipes({ userToView, filter }) {
  const { user } = useContext(AuthContext);
  const { recipesList, sort, loading, error } = useContext(RecipesContext);
  const [userList, setUserList] = useState([]);
  const [searchInput, setSearchInput] = useState({ name: "", method: "", ingredient: "" });
  const [searchResult, setSearchResult] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitSearch = (e) => {
    e.preventDefault();
    if (JSON.stringify(searchInput) !== JSON.stringify({ name: "", method: "", ingredient: "" })) {
      const filterResult = userList.filter((e) => {
        return (
          e.name.toLowerCase().includes(searchInput.name.trim().toLowerCase())
          && e.method.toLowerCase().includes(searchInput.method.trim().toLowerCase())
          && e.ingredients.some(i => i.ingredient.toLowerCase().includes(searchInput.ingredient.trim().toLowerCase()))
          )
      })
      setSearchResult(filterResult);
      handleClose();
    } else {
      alert("You must fill in at least one search field")
    }
  }

  const clearSearch = () => {
    setSearchResult(null);
    setSearchInput({ name: "", method: "", ingredient: "" });
  }

  useEffect(() => {
    if (recipesList && filter === "posted") {
      setUserList(recipesList.filter((recipe) => recipe.posted_by === userToView._id));
    } else if (recipesList && filter === "favourites") {
      setUserList(recipesList.filter((recipe) => recipe.favourited_by.includes(userToView._id)));
    }
  }, [recipesList, sort]);
  
  return (
    <div className='page-grid-4-1'>
    {loading && <PageLoader/>}
    {userList.length === 0 && <p>Looks like there's no recipes :(</p>}
    {error && <p>Something went wrong: {error}</p>}

    <div className='d-flex flex-column align-items-center'>
      <div className='cards-container mb-3'>
        {(userList && !searchResult) && <>
          {userList.map((drink) => {
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
      </>}

      <div className='d-flex align-items-end justify-content-between gap-2'>
        <SortSelector searchResult={searchResult} setSearchResult={setSearchResult} />
        <span className='show-on-collapse'>
        <Button variant='success' onClick={handleShow}>Search<Icon.ArrowBarRight style={{fontSize: "x-large"}}/></Button>
        </span>
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
  )
}

export default UserRecipes