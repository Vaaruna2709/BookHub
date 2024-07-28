import React from 'react'
import CardDetail from '../components/CardDetail'

import { Link } from 'react-router-dom'


export default function ShowBook() {
 
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <CardDetail></CardDetail>
     
      <br></br>
      <Link to='/commentsForm'>Want to add your Review. Click Me!</Link>

    </div>
  )
}
