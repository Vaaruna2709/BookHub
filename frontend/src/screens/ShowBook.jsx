import React from 'react'
import CardDetail from '../components/CardDetail'

import { Link,useParams,useLocation } from 'react-router-dom'
import Review from '../components/Reviews';



export default function ShowBook() {
  const { isbn } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const coverImageUrl = queryParams.get('coverImageUrl');
 
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <CardDetail></CardDetail>
     
      <br></br>
      <Link to={`/review/${isbn}?coverImageUrl=${coverImageUrl}`}>Want to add your Review. Click Me!</Link>
      <Review isbn={isbn}></Review>
    </div>
  )
}
