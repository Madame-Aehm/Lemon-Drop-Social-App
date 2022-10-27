import React, { useContext, useEffect, useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Card from 'react-bootstrap/Card';
import { displayNicely, formatImage500px } from '../utils/JSFunctions';
import { AuthContext } from '../context/AuthContext.js'
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import FavouriteButton from './FavouriteButton.js';
import DeleteButton from './DeleteButton.js';

function DrinkCard({ drink }) {
  const { user } = useContext(AuthContext);
  const formattedPicture = formatImage500px(drink.image.url)
  const [floats, setFloats] = useState('');

  useEffect(() => {
    if (user) {
      setFloats('d-flex flex-column align-items-end justify-content-between');
    }
    if (!user) {
      setFloats('d-flex flex-column align-items-end justify-content-end')
    }
  }, [user])
  

  return (
    <Card style={{maxWidth: "325px"}}>
      <Card.Img variant='top' src={formattedPicture} />
      <Card.ImgOverlay className={floats}>
        <>
        {user && (user._id !== drink.posted_by) &&
          <FavouriteButton recipe={drink} />
        }
        {user && (user._id === drink.posted_by) &&
            <span>
              <Link to={'/update-recipe'} className='edit-link' state={{ recipe: drink }} style={{marginRight: "0.5em"}}>
                <Icon.Pencil style={{fontSize: "large"}}/>
              </Link>
              <DeleteButton toDelete={drink} redirect={false} />
            </span>
        }
        </>
      <Link className='view-link-button' to={'/view-recipe/' + drink._id} >
          View full recipe
      </Link>
      </Card.ImgOverlay>

      <Card.Header bg="white" className='d-flex flex-wrap align-items-center justify-content-between'>
          <Card.Title className='header-title'>{drink.name}</Card.Title>
          <Card.Subtitle className="text-muted">
            { formatDistanceToNow(new Date(drink.createdAt), { addSuffix: true }) }
          </Card.Subtitle>
      </Card.Header>
      
      <Card.Body>
        <p>
          <strong className='sub-title'>Method: </strong>{drink.method}
        </p>
        <p>
          <strong className='sub-title'>Ingredients: </strong>
          {drink.ingredients.map((ingredient, i, arr) => {
            if (i + 1 === arr.length) {
              return <React.Fragment key={i}>{displayNicely(ingredient.ingredient)}</React.Fragment>
            } else {
               return <React.Fragment key={i}>{displayNicely(ingredient.ingredient)}, </React.Fragment>
            }
          })}
        </p>
        <div>
          <Icon.HeartFill style={{fontSize: "large", color: "#DE4940"}}/> Favourited by  {drink.favourited_by.length} mixologists
        </div>
        <br/>
        <br/>
      </Card.Body>
    </Card>
  )
}

export default DrinkCard