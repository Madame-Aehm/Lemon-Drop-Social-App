import React, { useContext } from 'react'
import getToken from '../utils/getToken';
import Card from 'react-bootstrap/Card';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { AuthContext } from '../context/AuthContext.js';
import Button from 'react-bootstrap/esm/Button';
import * as Icon from 'react-bootstrap-icons';
import SeeUserLink from './SeeUserLink';

function CommentCard({ comment, comments, setComments, recipe }) {
  const { user } = useContext(AuthContext);

  const deleteComment = async() => {
    const token = getToken();
    if (token) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({ comment: comment, recipePoster: recipe.posted_by });
        const reqOptions = {
          method: "PATCH",
          headers: myHeaders,
          body: body
        }
        const response = await fetch("http://localhost:5000/recipes/delete-comment/" + recipe._id, reqOptions);
        const result = await response.json();
        console.log(result);
        setComments(comments.filter((item) => item._id !== comment._id));
      } catch(error) {
        console.log(error);
        alert("It clings to existence. Try again?")
      }
    }
  }

  return (

    <Card style={{ width: '100%' }} className='mb-3'>
    <Card.Body>
      <Card.Title style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <SeeUserLink user={ comment.posted_by } />
        {user && <>
          {user._id === comment.posted_by._id && 
            <Button variant="danger" size="sm" onClick={deleteComment}>
              <Icon.Trash title='Delete Recipe' style={{fontSize: "large"}}/>
            </Button>}
        </>}
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        { formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) }
      </Card.Subtitle>
      <Card.Text>
        {comment.comment}
      </Card.Text>
    </Card.Body>
  </Card>

  )
}

export default CommentCard