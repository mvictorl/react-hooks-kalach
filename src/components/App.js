import React, {
  useState,
  useEffect,
  useRef,
  useContext
} from 'react'

import ThemeContext from "../context"

import Header from "./Header"
import PostList from "./PostList"
import Footer from "./Footer"

function App() {
  const myRef = useRef(null)

  const [ posts, setPosts ] = useState([])
  const [ check, setCheck ] = useState(false)
  const [ typeRequest, setTypeRequest ] = useState('posts')

  const { theme, setTheme } = useContext(ThemeContext)

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

  const handlerFocus = () => {
    myRef.current.focus()
    myRef.current.style.color = 'red'
  }

  return (
    <div className={ `app ${ theme }` }>
      <div className="form">
        <input ref={ myRef } type="text"/>
        <button onClick={ handlerFocus }>Focus</button>
      </div>

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