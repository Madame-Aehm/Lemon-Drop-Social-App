import React, { useContext } from 'react'
import Form from 'react-bootstrap/Form';
import { RecipesContext } from '../context/RecipesContext.js'

function SortSelector({ searchResult, setSearchResult }) {
  const { recipesList, setRecipesList, sort, setSort } = useContext(RecipesContext);

  const handleOnChange = (e) => {
    setSort(e.target.value);
    if (e.target.value === "newest") {
      setRecipesList(recipesList.sort((a, b) => (new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1)));
      if (searchResult) {
        setSearchResult(searchResult.sort((a, b) => (new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1)));
      }
    }
    if (e.target.value === "oldest") {
      setRecipesList(recipesList.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1)));
      if (searchResult) {
        setSearchResult(searchResult.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1)));
      }
    }
    if (e.target.value === "popular") {
      setRecipesList(recipesList.sort((a, b) => (a.favourited_by.length < b.favourited_by.length) ? 1 : -1));
      if (searchResult) {
        setSearchResult(searchResult.sort((a, b) => (a.favourited_by.length < b.favourited_by.length) ? 1 : -1));
      }
    }
    if (e.target.value === "recently-updated") {
      setRecipesList(recipesList.sort((a, b) => (new Date(a.updatedAt) < new Date(b.updatedAt) ? 1 : -1)));
      if (searchResult) {
        setSearchResult(searchResult.sort((a, b) => (new Date(a.updatedAt) < new Date(b.updatedAt) ? 1 : -1)))
      }
    }
    if (e.target.value === "method") {
      setRecipesList(recipesList.sort((a, b) => {
        const methodA = a.method.toLowerCase();
        const methodB = b.method.toLowerCase();
        if (methodA < methodB) {
          return -1
        } else if (methodA > methodB) {
          return 1
        } else {
          return 0
        }
      }))
      if (searchResult) {
        setSearchResult(searchResult.sort((a, b) => {
          const methodA = a.method.toLowerCase();
          const methodB = b.method.toLowerCase();
          if (methodA < methodB) {
            return -1
          } else if (methodA > methodB) {
            return 1
          } else {
            return 0
          }
        }))
      }
    }
  }

  return (
    <div className='d-flex'>
      <label>Sort by:</label>
      <Form.Select defaultValue={sort} onChange={handleOnChange}>
        <option value={"newest"}>Newest</option>
        <option value={"oldest"}>Oldest</option>
        <option value={"popular"}>Popular</option>
        <option value={"recently-updated"}>Recently Updated</option>
        <option value={"method"}>Method</option>
      </Form.Select>
    </div>
    
  )
}

export default SortSelector