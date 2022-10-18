import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import * as Icon from 'react-bootstrap-icons';
import useRecipeFetch from '../hooks/useRecipeFetch';
import PageLoader from '../components/PageLoader'
import '../css/viewRecipe.css'
import CommentCard from '../components/CommentCard';
import getToken from '../utils/getToken';
import { AuthContext } from '../context/AuthContext.js'

function ViewRecipe() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { drinkId } = location.state;
  const { recipe, comments, setComments, loading, error } = useRecipeFetch(drinkId);
  const [commentText, setCommentText] = useState("");

  const handleTextChange = (e) => {
    setCommentText(e.target.value);
  }

  const handleSubmit = async(e) => {
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
        console.log(result);
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
    console.log(comments)
  }, [comments])
  

  return (
    <div className='simple-display'>
      {loading && <PageLoader/>}
      {error && <p>error</p>}
      {(!loading && !error && recipe) && 
        <>
          <div className='recipe-div'>

            <h1 className='page-title'>{recipe.name}</h1>

            {user && (user._id === recipe.posted_by._id) &&
            <div style={{marginBottom: "0.5em", textAlign: "right"}}>
              <Button variant="danger" size="sm">
                <Icon.Trash title='Delete Recipe' style={{fontSize: "large"}}/>
              </Button>
            </div>}

            <img src={recipe.image.url} alt={recipe.name} style={{maxWidth: '500px', minWidth: '200px', width: '90%', alignSelf: "center"}}/>

            <Link className='simple-align' style={{alignSelf: "flex-end", padding: "0.2em 1em", textDecoration: "none"}}>
              <h5 className='account-mini-title'>{recipe.posted_by.username}</h5>
              <img src={recipe.posted_by.profile_picture.url} alt="Recipe Author" className='thumbnail-image'/>
            </Link>

            <div className='simple-align'>
              <h4 className='sub-title'>Method:</h4>
              <h5 style={{paddingLeft: "1em"}}>{recipe.method}</h5>
            </div>
            
            <h4 className='sub-title'>Ingredients</h4>
            <ul>
              {recipe.ingredients.map((ingredient) => {
                return <li key={ingredient._id}>{ingredient.quantity} {ingredient.measure} {ingredient.ingredient}</li>
              })}
            </ul>

            <h4 className='sub-title'>Instructions</h4>
            <ol style={{maxWidth: "100%"}}>
              {recipe.instructions.map((step, i) => {
                return <li key={"step"+i}>{step}</li>
              })}
            </ol>

            <h4 className='sub-title'>Comments: </h4>
            {comments.length === 0 && <p style={{textAlign: "center"}}>No comments yet :( </p>}
            {comments.length > 0 && comments.map((comment) => {
              return <CommentCard key={comment._id} comment={comment} comments={comments} setComments={setComments} recipeID={recipe._id}/>
            })}

            <hr/>

            {user && 
              <Form onSubmit={handleSubmit}>
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
          </div>
        </>}

      
      
    </div>
  )
}

export default ViewRecipe