import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>Tasks Form</h1>
      <Link style={linkStyle} to="/">Main</Link> | <Link style={linkStyle} to="/about">About Us</Link>
    </header>
  )
}

const headerStyle = {
  background: '#333',
  color: 'rgb(18, 14, 236)',
  textAlign: 'center',
  padding: '10px'
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
}

export default Header;