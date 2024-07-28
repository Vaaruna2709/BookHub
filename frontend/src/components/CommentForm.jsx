import React, { useState } from 'react';
import './CommentForm.css';
import Button from './Button';


export default function CommentForm({newComment}){
    let [formData,setFormData] = useState({
        username:"",
        review:"",
        rating:5
    });
    
    let handleInputChange = (event)=>{
        let fieldName = event.target.name;
        let newValue = event.target.value;
       
        setFormData((data)=>{
            data[fieldName] = newValue;
            return {...data};
        })
    
    }
    let handleSubmit = (e)=>{
        console.log(formData);
        newComment(formData);
        e.preventDefault();
        setFormData({
            username:"",
            review:"",
            rating:5
        })
    }
    return(
        <div>
            <form className='reviewForm'>
                <input placeholder='enter username'value={formData.username} name='username'type="text" onChange={handleInputChange} id='username' ></input>
                <textarea placeholder='enter your reviews' value={formData.review} name="review" onChange={handleInputChange} id='reviews'></textarea>
                <input placeholder='enter rating'value={formData.rating} name='rating' type='number'onChange={handleInputChange} id='rating' ></input>
                <Button onclick={handleSubmit} text={'Add a Comment'}></Button>
             </form>
        </div>
    )
}