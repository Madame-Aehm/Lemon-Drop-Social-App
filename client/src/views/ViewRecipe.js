import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import * as Icon from 'react-bootstrap-icons';
import useRecipeFetch from '../hooks/useRecipeFetch';
import PageLoader from '../components/PageLoader'
import '../css/viewRecipe.css'
import CommentCard from '../components/CommentCard';
import getToken from '../utils/getToken';
import { AuthContext } from '../context/AuthContext.js'
import { RecipesContext } from '../context/RecipesContext.js'
import SeeUserLink from '../components/SeeUserLink';
import FavouriteButton from '../components/FavouriteButton';

function ViewRecipe() {
  const { user } = useContext(AuthContext);
  const redirect = useNavigate();
  const { handleDeleteRecipe } = useContext(RecipesContext);
  const location = useLocation();
  const { drinkId } = location.state;
  const { recipe, comments, setComments, loading, setLoading, error } = useRecipeFetch(drinkId);
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

  const deleteOnClick = async() => {
    setLoading(true);
    await handleDeleteRecipe(recipe);
    redirect("/home", {replace: true});
  }

  return (
    <div className='simple-display'>
      {loading && <PageLoader/>}
      {error && <p>{error}</p>}
      {!recipe && <p>There nothing here?</p>}
      {(!loading && !error && recipe) && 
        <>
          <div className='recipe-div'>
            {(user && user._id !== recipe.posted_by._id) && <FavouriteButton recipe={recipe} />}

            <h1 className='page-title'>{recipe.name}</h1>

            {user && (user._id === recipe.posted_by._id) &&
            <div style={{marginBottom: "0.5em", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1em"}}>
              <Link to={'/update-recipe'} className='edit-link' 
                state={{ recipe: recipe }}>
                <Icon.Pencil style={{fontSize: "large"}} title='Edit Recipe' />
              </Link>
              <Button variant="danger" size="sm" onClick={deleteOnClick}>
                <Icon.Trash title='Delete Recipe' style={{fontSize: "large"}}/>
              </Button>
            </div>}

            <img src={recipe.image.url} alt={recipe.name} style={{maxWidth: '500px', minWidth: '200px', width: '90%', alignSelf: "center"}}/>

            <SeeUserLink user={ recipe.posted_by }  />

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
          </div>
        </>}

      
      
    </div>
  )
}

export default ViewRecipe