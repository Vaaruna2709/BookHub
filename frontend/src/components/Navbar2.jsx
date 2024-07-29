import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Navbar.css"
export default function Navbar2() {
  const navigate = useNavigate()
 let handleProfile =()=>{
    navigate('/profile')
  }


  return (
   
    <div className='myContainer' >
        <div className="logo" >
            <img src="/logo.png"/>
        </div>
        <div className="authentication">
            <Link to="/createBook">Create</Link>
            &nbsp;  &nbsp;  &nbsp;
            <Link to="/purchasedBooks">Purchased Books</Link> &nbsp;  &nbsp;
            <i class="fa-solid fa-user" style={{color: '#f6fefd'}} onClick={handleProfile}></i>
        </div>
    </div>
  )
}
