import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
export default function Navbar2() {
  return (
   
    <div className='myContainer' >
        <div className="logo" >
            <img src="/logo.png"/>
        </div>
        <div className="authentication">
            <Link to="/createBook">Create</Link>
            &nbsp;  &nbsp;  &nbsp;
            <Link to="/purchased">Purchased Books</Link> &nbsp;  &nbsp;
            <i class="fa-solid fa-user"></i>
        </div>
    </div>
  )
}
