import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard';

export default function Review({isbn}) {
    const [reviews, setReviews] = useState([]);
    console.log(Array.isArray(reviews))
 useEffect(()=>{
    const fetchReviews =async()=>{
    try{
        
            const response = await fetch(`http://localhost:8080/reviews/${isbn}`,{
                method:'GET',
               
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
        
            <h4>Reviews</h4>
            {
                reviews.length>0?(
                    reviews.map(review=>{
                        return(
                          <ReviewCard username={review.username} rating={review.rating} remarks={review.review}></ReviewCard>
                        )
                       
                    })
                ):(
                  
                    <p>No reviews yet!</p>
                )
            }
           
        
    </div>
   
  )
}