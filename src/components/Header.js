import React from 'react'
import CheckBox from "../common/CheckBox"

const Header = ({ check, changeTheme }) => {
  return (
    <header className="blog-header">
      <div className="layout layout-header">
        <div className="blog-logo">
          <a href="/">IT Блог</a>
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