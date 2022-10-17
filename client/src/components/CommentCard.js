import React from 'react'

function CommentCard({ comment, setComments }) {

  return (
    <div key={comment._id}>
      {comment.comment}
      <button>x</button>
    </div>
  )
}

export default CommentCard