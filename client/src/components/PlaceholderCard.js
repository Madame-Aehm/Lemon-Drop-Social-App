import React from 'react'
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

function PlaceholderCard() {
  return (
    <Card style={{maxWidth: "325px"}}>
      <Card.Img variant="top" src="images/placeholder.png" alt="Loading" />
      <Card.Body className='d-flex flex-column'>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <br/>
        <Placeholder.Button variant="outline-success" xs={6} className='align-self-end pt-3'/>
      </Card.Body>
    </Card>
  )
}

export default PlaceholderCard