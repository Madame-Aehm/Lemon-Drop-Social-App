import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import * as Icon from 'react-bootstrap-icons';
import { RecipesContext } from '../context/RecipesContext.js'
import PageLoader from './PageLoader.js';
import { useNavigate } from 'react-router-dom';


function DeleteButton({toDelete, redirect}) {
  const { handleDeleteRecipe } = useContext(RecipesContext);
  const [loading, setLoading] = useState(false);
  const redirectOnDelete = useNavigate();

  const redirectHome = async() => {
    redirectOnDelete("/home", {replace: true});
  }
  
  const handleClick = () => {
    setLoading(true);
    handleDeleteRecipe(toDelete);
    setLoading(false);
    if (redirect) {
      redirectHome();
    }
  }

  return (
    <>
      {loading && <PageLoader />}
      <Button variant="danger" size="sm" onClick={handleClick}>
        <Icon.Trash title='Delete Recipe' style={{fontSize: "large"}}/>
      </Button>
    </>
    
  )
}

export default DeleteButton