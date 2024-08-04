import React, { useState } from 'react';
import './CommentForm.css';
import Button from '../components/Button';
import { useParams,useNavigate,useLocation } from 'react-router-dom';


export default function CommentForm(){
    const {isbn} = useParams()
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const coverImageUrl = queryParams.get('coverImageUrl');
    const navigate = useNavigate()
    let [formData,setFormData] = useState({
        username:"",
        review:"",
        rating:5,
     
    });
    
    let handleInputChange = (event)=>{
        let fieldName = event.target.name;
        let newValue = event.target.value;
       
        setFormData((data)=>{
            data[fieldName] = newValue;
            return {...data};
        })
       
    
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:8080/reviews/${isbn}`, {
         
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
      
          const json = await response.json();
          if (json.success) {
            alert('Review Added Successfully')
            console.log(coverImageUrl)
            navigate(`/card/${isbn}?coverImageUrl=${coverImageUrl}`)
            console.log(json)
          }else if(json.error){
            alert(json.error)
          }
          setFormData({
            username: "",
            review: "",
            rating: 5
          });
        } catch (error) {
          console.error('Error:', error);
        }
      };
    return(
        <div>
            <form className='reviewForm'>
                <input placeholder='enter username'value={formData.username} name='username'type="text" onChange={handleInputChange} id='username' ></input>
                <textarea placeholder='enter your reviews' value={formData.review} name="review" onChange={handleInputChange} id='reviews'></textarea>
                <input placeholder='enter rating'value={formData.rating} name='rating' type='number'onChange={handleInputChange} id='rating' ></input>
                <Button submit={handleSubmit} text={'Add a Comment'}></Button>
             </form>
        </div>
    )
}