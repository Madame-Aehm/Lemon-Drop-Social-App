import React from 'react'
import { formatProfileImage500px } from '../utils/JSFunctions'

function UserPlainView({ userToView, display }) {
  const formattedPicture = formatProfileImage500px(userToView.profile_picture.url);
  const date = new Date(userToView.createdAt).toDateString().substring(4);

  return (

    <>
      <img  style={{border: "solid 1px rgba(0,0,0,0.3)", borderRadius: "50%"}} src={formattedPicture} alt={`${userToView.username}'s profile`}/>

      <div className='plain-user-info' style={ display }>
        <h5>{userToView.username}</h5>

        {userToView.email && 
          <div className='simple-align'>
            <h6 className='account-mini-title'>Email: </h6>
            <h6 className='sub-title'>{userToView.email}</h6>
          </div>
        }
        

        <div className='simple-align'>
          <h6 className='account-mini-title'>User since: </h6>
          <h6 className='sub-title'>{date}</h6>
        </div>

        <div className='simple-align'>
          <h6 className='account-mini-title'>Recipes posted: </h6>
          <h6 className='sub-title'>{userToView.posted_recipes.length}</h6>
        </div>

        {userToView.description !== "" && 
          <div>
            <h6 className='account-mini-title'>Description: </h6>
            <p>{userToView.description}</p>
          </div>
        }
      </div>
    </>
  )
}

export default UserPlainView