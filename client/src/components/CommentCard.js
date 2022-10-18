import React, { useContext } from 'react'
import getToken from '../utils/getToken';
import Card from 'react-bootstrap/Card';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { AuthContext } from '../context/AuthContext.js';

function CommentCard({ comment, comments, setComments, recipeID }) {
  const { user } = useContext(AuthContext);

  const deleteComment = async() => {
    const token = getToken();
    if (token) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({ _id: comment._id });
        const reqOptions = {
          method: "PATCH",
          headers: myHeaders,
          body: body
        }
        const response = await fetch("http://localhost:5000/recipes/delete-comment/" + recipeID, reqOptions);
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
        <div className='simple-align'>
          <img src={comment.posted_by.profile_picture.url} alt={comment.posted_by.username} className='thumbnail-image' />
          {comment.posted_by.username}
        </div>
        {user && <>
          {user._id === comment.posted_by._id && <button onClick={deleteComment}>x</button>}
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