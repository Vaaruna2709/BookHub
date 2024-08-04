import React, { useEffect, useState } from 'react'

export default function Review({isbn}) {
    const [reviews, setReviews] = useState([]);
    console.log(Array.isArray(reviews))
 useEffect(()=>{
    const fetchReviews =async()=>{
    try{
        
            const response = await fetch('http://localhost:8080/reviews',{
                method:'GET',
                params :{
                    isbn :isbn
                }
            })
           const data = await response.json();
           setReviews(data);
           console.log(Array.isArray(data));
            console.log(setReviews)
        }
    catch(err){
        console.log(err)
        alert(err)
    
    };
}
   

      fetchReviews();
 },[])
 

  return (
    <div className="reviews">
        {
            reviews.map(review=>{
                return(
                    <p>{review}</p>
                )
               
            })
        }
    </div>
   
  )
}