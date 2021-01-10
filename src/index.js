import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'

import ThemeContext from "./context"

import reportWebVitals from './reportWebVitals'

function Main() {

  const [ theme, setTheme ] = useState('light')

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <App/>
      </ThemeContext.Provider>
    </React.StrictMode>
  )
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
