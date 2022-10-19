import React, { useContext } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { RecipesContext } from '../context/RecipesContext.js'
import { deleteImage } from '../utils/imageMangement.js';
import { displayNicely, formatImage500px } from '../utils/JSFunctions';
import { AuthContext } from '../context/AuthContext.js'
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

function DrinkCard({ drink }) {
  const { deleteRecipe, recipesList, setRecipesList } = useContext(RecipesContext);
  const { user } = useContext(AuthContext);

  const formattedPicture = formatImage500px(drink.image.url)

  const handleDeleteRecipe = async (drink) => {
    if (window.confirm("You're sure you want to delete this recipe? This is cannot be undone.")) {
      try {
        const deleted = await deleteRecipe(drink._id);
        console.log(deleted.msg);
        setRecipesList(recipesList.filter((recipe) => recipe._id !== drink._id));
        try {
          const deletedImage = await deleteImage(drink.image);
          console.log(deletedImage);
        } catch (error) {
          console.log("Recipe deleted, but problem deleting image: ", error);
        }
      } catch (error) {
        alert("Something went wrong: " + error);
      }
    }
  }

  return (

    <Card style={{maxWidth: "30em"}}>
        {user && (user._id === drink.posted_by) && 
          <Card.Header style={{textAlign: "right"}}>
            <Button variant="danger" size="sm" onClick={() => handleDeleteRecipe(drink)}>
              <Icon.Trash title='Delete Recipe' style={{fontSize: "large"}}/>
            </Button>
          </Card.Header>
        }
      
      <Link to={'/view-recipe'} state={{ drinkId: drink._id }}>
        <Card.Img variant="top" src={formattedPicture} />
      </Link>
      
      <Card.Header>
        <span style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <Card.Title style={{color: "#1b8f47", marginBottom: 0}}>{drink.name}</Card.Title>
          <Card.Subtitle className="text-muted">
            { formatDistanceToNow(new Date(drink.createdAt), { addSuffix: true }) }
          </Card.Subtitle>
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
      <Link to={'/view-recipe'} state={{ drinkId: drink._id }} style={{textDecoration: "none", textAlign: "center"}}>
        <Card.Footer style={{backgroundColor: "#1b8f47", color: "white", fontSize: "large"}}>
          View full recipe
        </Card.Footer>
      </Link>
    </Card>
  )
}

export default DrinkCard