import React from 'react'
import { Link } from 'react-router-dom'
import './ConnectivityNav.css'

export default function Nav(props) {
  return (
    <nav className='Nav flex-container'>
      <div className="flex-item">
        <Link to={'/'}>
          Posts
        </Link>
      </div>
      <div className="flex-item">
        <Link to={'/members'}>
          Members
        </Link>
      </div>
      <div className="flex-item">
        <Link to={'/messages'}>
          Messages
        </Link>
      </div>
    </nav>
  )
}