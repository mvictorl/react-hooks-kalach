import React, {
  useState,
  useEffect
} from 'react'

import Header from "./Header"
import PostList from "./PostList"
import Footer from "./Footer"

function App() {

  const [ posts, setPosts ] = useState([])
  const [ theme, setTheme ] = useState('light')
  const [ check, setCheck ] = useState(false)

  const [ typeRequest, setTypeRequest ] = useState('posts')

  useEffect(() => {
    setTimeout(() => {
      document.title = `${ typeRequest } Page`
    }, 500)

    fetch(`https://jsonplaceholder.typicode.com/${ typeRequest }?_start=0&_limit=10`)
      .then(response => response.json())
      .then(json => setPosts(json))
    return () => {
      document.title = 'Page'
    }
  }, [ typeRequest ])

  const change = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    setCheck(!check)
  }

  return (
    <div className={ `app ${ theme }` }>
      <Header
        changeTypeRequest={ setTypeRequest }
        check={ check }
        changeTheme={ change }
      />

      <PostList posts={ posts }/>

      <Footer/>
    </div>
  )
}

export default App