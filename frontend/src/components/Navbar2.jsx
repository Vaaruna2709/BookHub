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
           <span className='bookHubLogo'>B</span>
        </div>
        <div className="authentication">
            <Link to="/createBook">Create</Link>
            &nbsp;  &nbsp; 
            <Link to="/purchasedBooks">Purchased Books</Link> &nbsp;  
            <i className="fa-solid fa-user" style={{color: '#f6fefd'}} onClick={handleProfile}></i>
        </div>
    </div>
  )
}
