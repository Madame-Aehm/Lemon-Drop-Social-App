import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import useRecipeFetch from '../hooks/useRecipeFetch';
import PageLoader from '../components/PageLoader'
import '../css/viewRecipe.css'
import CommentCard from '../components/CommentCard';
import getToken from '../utils/getToken';

function ViewRecipe() {
  const location = useLocation();
  const { drinkId } = location.state;
  const { recipe, comments, setComments, loading, error } = useRecipeFetch(drinkId);
  const [commentText, setCommentText] = useState("");
  console.log(recipe);

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
        console.log(result);
        setComments(result.comments);
        setCommentText("");
      } catch(error) {
        console.log(error);
      }
    }
  } 

  return (
    <div className='simple-display'>
      {loading && <PageLoader/>}
      {error && <p>error</p>}
      {(!loading && !error && recipe) && 
        <>
          <div className='recipe-div'>
            <h1 className='page-title'>{recipe.name}</h1>
            <img src={recipe.image.url} alt={recipe.name} style={{maxWidth: '500px', minWidth: '200px', width: '90%', alignSelf: "center"}}/>
            <br/>
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
            <div className='simple-align'>
              <h4 className='sub-title'>This recipe was posted by: </h4>
              <Link className='simple-align'>
                <img src={recipe.posted_by.profile_picture.url} style={{width: "50px", height: "50px", borderRadius: "50%"}} alt={recipe.posted_by.username}/>
                <h5>{recipe.posted_by.username}</h5>
              </Link>  
            </div>
            <br/>
            <h4 className='sub-title'>Comments: </h4>
            {console.log(comments.length)}
            {comments.length === 0 && <p style={{textAlign: "center"}}>No comments yet :( </p>}
            {comments.length > 0 && comments.map((comment) => {
              return <CommentCard comment={comment} setComments={setComments}/>
            })}
            <h4 className='sub-title'>Leave a comment: </h4>
            <textarea style={{width: "100%"}} value={commentText} onChange={handleTextChange}/>
            <button onClick={handleSubmitComment}>Post comment</button>
            
          </div>
        </>}

      
      
    </div>
  )
}

export default ViewRecipe