import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import * as Icon from 'react-bootstrap-icons';
import { RecipesContext } from '../context/RecipesContext.js'
import PageLoader from './PageLoader.js';


function DeleteButton({toDelete}) {
  const { handleDeleteRecipe } = useContext(RecipesContext);
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    setLoading(true);
    handleDeleteRecipe(toDelete);
    setLoading(false);
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