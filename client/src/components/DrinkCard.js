import React from 'react'
import Card from 'react-bootstrap/Card';
import { displayNicely } from '../utils/JSFunctions';

function DrinkCard({drink}) {

  return (
    <Card style={{minWidth: "80%"}}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title style={{color: "#94d333"}}>{drink.name}</Card.Title>
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