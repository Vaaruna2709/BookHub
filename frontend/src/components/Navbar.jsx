import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
export default function Navbar() {
  return (
   
    <div className='myContainer' >
        <div className="logo" >
            <img src="/logo.png"/>
        </div>
        <div className="authentication">
            <Link to="/login">Login</Link>
            &nbsp;  &nbsp;  &nbsp;
            <Link to="/createUser">SignUp</Link>
        </div>
    </div>
  )
}
