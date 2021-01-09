import React, { useState, useMemo } from 'react'

function testSum(x) {
  console.log('testSum. counter =', x)
  return x + x
}

const Post = ({ title, body, name, email }) => {
  const [ counter, setCounter ] = useState(0)
  const [ isGreen, setIsGreen ] = useState(false)

  const sum = useMemo(() => testSum(counter), [ counter ])

  return (
    <div className="article-content">
      <div className="article-title">
        <a href="/">{ title }</a>
        <a href="/">{ name }</a>
      </div>
      <p
        className="article-text"
        style={ { color: isGreen ? 'green' : 'red' } }
        onClick={ () => setIsGreen(!isGreen) }
      >
        { body }
        { email }
      </p>
      { sum }&nbsp;
      <button onClick={ () => setCounter(counter + 1) }>+</button>
    </div>
  )
}

export default React.memo(Post)