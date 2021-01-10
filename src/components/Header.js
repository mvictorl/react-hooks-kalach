import React, { useEffect } from 'react'
import CheckBox from "../common/CheckBox"

const Header = ({ changeTypeRequest, check, changeTheme }) => {
  useEffect(() => {
    console.log('Update <Header>')
  }, [changeTypeRequest])

  return (
    <header className="blog-header">
      <div className="layout layout-header">
        <div className="blog-logo">
          <a href="/">IT Блог</a>
        </div>

        <div className="tabs">
          <button onClick={ () => changeTypeRequest('posts') }>Посты</button>
          <button onClick={ () => changeTypeRequest('users') }>Пользователи</button>
        </div>

        <CheckBox
          checked={ check }
          changeTheme={ changeTheme }
        />
      </div>
    </header>
  )
}

export default Header