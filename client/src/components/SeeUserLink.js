import React from 'react'
import { Link } from 'react-router-dom'
import { formatImageThumb } from '../utils/JSFunctions'

function SeeUserLink({ user }) {
  const formattedPicture = formatImageThumb(user.profile_picture.url);

  return (
    <Link className='simple-align' style={{ textDecoration: "none"}}
    to={'/view-user'} state={{ userId: user._id }}>
      <img src={formattedPicture} alt="Recipe Author" className='thumbnail-image'/>
      <h5 className='account-mini-title'>{user.username}</h5>
    </Link>
  )
}

export default SeeUserLink