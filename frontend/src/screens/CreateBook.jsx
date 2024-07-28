import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './CreateBook.css'
export default function CreateBook() {
    let navigate = useNavigate()
    let [formData, setFormData] = useState({
       title:'',
       author:'',
       publisher:'',
       publish_date:'',
       coverImage:'',
       genre:''

    });

    let handleInputChange = (event) => {
        let fieldName = event.target.name;
        let newValue = event.target.value;

        setFormData((data) => {
            data[fieldName] = newValue;
            return { ...data };
        })

    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:8080/book/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const json = await response.json();
        if (json.success) {
            navigate('/user')
        } else {
            alert('Invalid Details')
        }


    }
    return (
        <>
            <form  onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column',justifyContent:'flex-start',alignItems:'center',width:'100%' }}>
                <h4>Create a Book</h4>
               
                    <input placeholder='Title' value={formData.title} id='title' onChange={handleInputChange} name="title" ></input>
             
                    <input placeholder='Author Name' id="author" name='author' value={formData.author} onChange={handleInputChange}></input>
                   
                    <input placeholder='CoverImg URL' id="coverImage" name='coverImage' value={formData.coverImage}  onChange={handleInputChange}></input>
                    <input placeholder='Genre' value={formData.genre} id='genre' onChange={handleInputChange} name="genre" ></input>
                    <input placeholder='Publish_Year' value={formData.publish_date} id='publish_date' onChange={handleInputChange} name="publish_date" ></input>
            
                    <input placeholder='Publisher' id="publisher" name='publisher' value={formData.publisher}  onChange={handleInputChange}></input>
           

                <Button text='Submit' submit={handleSubmit}/>
                <Link to='/login' style={{ margin: "1rem" }}>Already a User?</Link>
            </form>

        </>
    )
}

