import React from 'react'
import { Link } from 'react-router-dom'

function SeeUserLink({ user }) {

  return (
    <Link className='simple-align' style={{ textDecoration: "none"}}
    to={'/view-user'} state={{ userId: user._id }}>
      <img src={user.profile_picture.url} alt="Recipe Author" className='thumbnail-image'/>
      <h5 className='account-mini-title'>{user.username}</h5>
    </Link>
  )
}

export default SeeUserLink