import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { RecipesContext } from '../context/RecipesContext.js'
import { deleteImage } from '../utils/imageMangement.js';
import { displayNicely } from '../utils/JSFunctions';

function DrinkCard({drink, myList, setMyList}) {
  const { deleteRecipe, recipesList, setRecipesList } = useContext(RecipesContext);

  const handleDeleteRecipe = async (drink) => {
    if (window.confirm("You're sure you want to update your display picture?")) {
      try {
        const deleted = await deleteRecipe(drink._id);
        setRecipesList(recipesList.filter((recipe) => recipe._id !== drink._id));
        try {
          await deleteImage(drink.image);
          alert(deleted.msg);
        } catch (error) {
          console.log("Recipe deleted, but problem deleting image: ", error);
        }
      } catch (error) {
        alert("Something went wrong: " + error);
      }
    }
  }

  return (
    <Card>
      {drink.image && <Card.Img variant="top" src={drink.image.url} />}
      <Card.Header>
        <span style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <Card.Title style={{color: "#1b8f47", marginBottom: 0}}>{drink.name}</Card.Title>
          <Button variant="danger" onClick={() => handleDeleteRecipe(drink)}>Delete</Button>
        </span>
      </Card.Header>
      
      <Card.Body>
        <p>
          <strong className='sub-title'>Method: </strong>{drink.method}
          <br/><strong className='sub-title'>Ingredients: </strong>
          {drink.ingredients.map((ingredient, i, arr) => {
            if (i + 1 === arr.length) {
              return <React.Fragment key={i}>{displayNicely(ingredient.ingredient)}</React.Fragment>
            } else {
               return <React.Fragment key={i}>{displayNicely(ingredient.ingredient)}, </React.Fragment>
            }
          })}
        </p>
      </Card.Body>
    </Card>
  )
}

export default DrinkCard