import React from 'react'

const Post = ({ title, body, name, email }) => {
  return (
    <div className="article-content">
      <div className="article-title">
        <a href="/">{ title }</a>
        <a href="/">{ name }</a>
      </div>
      <p className="article-text">
        { body }
        { email }
      </p>
    </div>
  )
}

export default Post