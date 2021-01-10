import React, {
  // useState,
  useEffect,
  useRef,
  useContext,
  useReducer
} from 'react'

import ThemeContext from "../context"

import Header from "./Header"
import PostList from "./PostList"
import Footer from "./Footer"

function reducer(state, action) {
  switch (action.type) {
    case 'fetch':
      return {
        ...state,
        posts: action.payload
      }
    case 'posts':
      return {
        ...state,
        typeRequest: action.type
      }
    case 'users':
      return {
        ...state,
        typeRequest: action.type
      }
    case 'check':
      return {
        ...state,
        check: !state.check
      }
    case 'reset':
      return init(action.payload)
    default:
      return state
  }
}

function init(state) {
  // console.log(state)
  // return state
  // Позволяет добавлять или изменять первичное состояние
  return state
}

function App() {
  const myRef = useRef(null)

  // const [ posts, setPosts ] = useState([])
  // const [ check, setCheck ] = useState(false)
  // const [ typeRequest, setTypeRequest ] = useState('posts')

  const { theme, setTheme } = useContext(ThemeContext)

  const [ data, dispatch ] = useReducer(reducer,
    {
      posts: [],
      check: false,
      typeRequest: 'posts'
    },
    init
  )

  useEffect(() => {
    // console.log(data)
    // dispatch({type: 'reset', payload: { posts: [], check: true, typeRequest: 'posts' }})

    setTimeout(() => {
      document.title = `${ data.typeRequest } Page`
    }, 500)

    fetch(`https://jsonplaceholder.typicode.com/${ data.typeRequest }?_start=0&_limit=10`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: 'fetch', payload: json })
      })
    return () => {
      document.title = 'Page'
    }
  }, [ data.typeRequest ])

  const change = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    dispatch({ type: 'check' })
  }

  const handlerFocus = () => {
    myRef.current.focus()
    myRef.current.style.color = 'red'
  }

  const setTypeRequest = (type) => {
    dispatch({ type })
  }

  return (
    <div className={ `app ${ theme }` }>
      <div className="form">
        <input ref={ myRef } type="text"/>
        <button onClick={ handlerFocus }>Focus</button>
      </div>

      <Header
        changeTypeRequest={ setTypeRequest }
        check={ data.check }
        changeTheme={ change }
      />

      <PostList posts={ data.posts }/>

      <Footer/>
    </div>
  )
}

export default App