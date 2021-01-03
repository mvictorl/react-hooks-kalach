import React from 'react'

const Footer = () => {
  return (
    <footer className="blog-footer layout">
      @ { new Date().getFullYear() } IT Блог
    </footer>
  )
}

export default Footer