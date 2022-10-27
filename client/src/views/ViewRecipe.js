import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import * as Icon from 'react-bootstrap-icons';
import useRecipeFetch from '../hooks/useRecipeFetch';
import PageLoader from '../components/PageLoader'
import CommentCard from '../components/CommentCard';
import getToken from '../utils/getToken';
import { AuthContext } from '../context/AuthContext.js'
import SeeUserLink from '../components/SeeUserLink';
import FavouriteButton from '../components/FavouriteButton';
import Fade from 'react-bootstrap/Fade';
import Card from 'react-bootstrap/Card';
import DeleteButton from '../components/DeleteButton';
import { formatDistanceToNow } from 'date-fns';

function ViewRecipe() {
  const { user } = useContext(AuthContext);
  const [mount, setMount] = useState(false);
  const { _id } = useParams();
  const { recipe, comments, setComments, loading, error } = useRecipeFetch(_id);
  const [commentText, setCommentText] = useState("");

  const handleTextChange = (e) => {
    setCommentText(e.target.value);
  }

  const handleSubmitComment = async(e) => {
    e.preventDefault();
    const token = getToken();
    if (token) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({comment: commentText});
        const reqOptions = {
          method: "POST",
          headers: myHeaders,
          body: body
        }
        const response = await fetch("http://localhost:5000/recipes/add-comment/" + recipe._id, reqOptions);
        const result = await response.json();
        const newComment = result.comments[result.comments.length - 1];
        setComments([...comments, { 
          comment: newComment.comment,
          createdAt: newComment.createdAt,
          updatedAt: newComment.updatedAt,
          _id: newComment._id,
          posted_by: {
            username: user.username,
            _id: user._id,
            profile_picture: {
              url: user.profile_picture.url
            }
          }
         }]);
        setCommentText("");
      } catch(error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    setMount(true);
  }, [])

  return (
    <Fade in={mount}>
    <div className='simple-display'>
      {loading && <PageLoader/>}
      {error && <p>{error}</p>}
      {recipe.error && <p>{recipe.error}</p>}
      {(!error && recipe.name) &&
        <>
          <Card style={{maxWidth: "800px"}}>
            <Card.Header className='d-flex align-items-center justify-content-between'>
              <Card.Title className='header-title text-center'>
                {recipe.name}
              </Card.Title>
              {(user && user._id !== recipe.posted_by._id) && 
                <FavouriteButton recipe={recipe} includeCount={true}/>
              }
              {user && (user._id === recipe.posted_by._id) &&
                <span>
                  <Link to={'/update-recipe'} className='edit-link' state={{ recipe: recipe }} style={{marginRight: "0.5em"}}>
                    <Icon.Pencil style={{fontSize: "large"}} title='Edit Recipe' />
                  </Link>
                  <DeleteButton toDelete={recipe} redirect={true} />
                </span>
              }
            </Card.Header>

            <Card.Img src={recipe.image.url} alt={recipe.name}/>

            <Card.Header className='d-flex flex-wrap justify-content-center justify-content-sm-between align-items-center gap-3'>
              <div>
                <SeeUserLink user={ recipe.posted_by }  />
              </div>
              <div className='d-flex flex-column align-items-end'>
                <Card.Subtitle className='text-muted text-right mb-2'>Originally posted: { new Date(recipe.createdAt).toDateString().substring(4) }</Card.Subtitle>
                <Card.Subtitle className='text-muted text-right'>Last updated: { formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true }) }</Card.Subtitle>
              </div>
            </Card.Header>

            <Card.Body className='d-flex flex-column'>

              <Card.Title>Method:</Card.Title>
              <Card.Text>{recipe.method}</Card.Text>
             
              <Card.Title>Ingredients:</Card.Title>
              <ul>
                {recipe.ingredients.map((ingredient) => {
                  return <li key={ingredient._id}>{ingredient.quantity} {ingredient.measure} {ingredient.ingredient}</li>
                })}
              </ul>

              <Card.Title>Instructions:</Card.Title>
              <ol style={{maxWidth: "100%"}}>
                {recipe.instructions.map((step, i) => {
                  return <li key={"step"+i}>{step}</li>
                })}
              </ol>

              <span className='align-self-end'>
                <Icon.HeartFill style={{fontSize: "large", color: "#DE4940"}}/> Favourited {recipe.favourited_by.length} times
              </span>

              <Card.Title>Comments:</Card.Title>
              {comments.length === 0 && <p style={{textAlign: "center"}}>No comments yet :( </p>}
              {comments.length > 0 && comments.map((comment) => {
                return <CommentCard key={comment._id} comment={comment} comments={comments} setComments={setComments} recipe={recipe} />
              })}

              <hr/>

              {user && 
                <Form onSubmit={handleSubmitComment}>
                  <Form.Label className='sub-title'>Leave a comment: </Form.Label>
                  <Form.Control className='mb-3' as="textarea" rows={3} value={commentText} onChange={handleTextChange}/>
                  <Button variant='success' type='submit'>Post comment</Button>
                </Form>
              }
              {!user && 
                <Form>
                  <Form.Label className='sub-title'>Leave a comment: </Form.Label>
                  <Form.Control className='mb-3' as="textarea" rows={3} placeholder='Only logged-in users can leave comments.' disabled/>
                  <Button disabled variant='success' type='submit'>Post comment</Button>
                </Form>
              }

            </Card.Body>

            
          </Card>
        </>}

      
      
    </div>
    </Fade>
  )
}

export default ViewRecipe