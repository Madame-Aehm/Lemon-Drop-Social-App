import React, { useContext } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { RecipesContext } from '../context/RecipesContext.js'
import { displayNicely, formatImage500px } from '../utils/JSFunctions';
import { AuthContext } from '../context/AuthContext.js'
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import FavouriteButton from './FavouriteButton.js';

function DrinkCard({ drink }) {
  const { handleDeleteRecipe } = useContext(RecipesContext);
  const { user } = useContext(AuthContext);

  const formattedPicture = formatImage500px(drink.image.url)

  return (

    <Card style={{maxWidth: "30em"}}> 
          <Card.Header style={{display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1em"}}>
            {user && (user._id === drink.posted_by) &&
              <>
                <Link to={'/update-recipe'} className='edit-link' state={{ recipe: drink }}>
                  <Icon.Pencil style={{fontSize: "large"}}/>
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDeleteRecipe(drink)}>
                  <Icon.Trash title='Delete Recipe' style={{fontSize: "large"}}/>
                </Button>
                <FavouriteButton recipe={drink} />
              </>
            }
            {user && (user._id !== drink.posted_by) &&
              <FavouriteButton recipe={drink} />
            }
          </Card.Header>
      
      <Link to={'/view-recipe'} state={{ drinkId: drink._id }}>
        <Card.Img variant="top" src={formattedPicture} />
      </Link>
      
      <Card.Header>
        <span style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <Card.Title style={{color: "#1b8f47", marginBottom: 0}}>{drink.name}</Card.Title>
          <Card.Subtitle className="text-muted">
            { formatDistanceToNow(new Date(drink.updatedAt), { addSuffix: true }) }
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