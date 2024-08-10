import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
export default function SignUp() {
    let navigate = useNavigate()
    let [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
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
        const response = await fetch("http://localhost:8080/api/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: formData.username, email: formData.email, password: formData.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('userEmail', formData.email);
            navigate('/user');
           
        } else {
            alert('Invalid credentials')
        }


    }
    return (
        <>
            <form  onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column',justifyContent:'flex-start',alignItems:'center',width:'100%' }}>
                <h4>SignUp Form</h4>
               
                    <input placeholder='enter your email' value={formData.email} id='email' onChange={handleInputChange} name="email" style={{ margin: '1rem', width: '90%', height: '2rem', backgroundColor: 'azure', border: '2px solid white', color:'black'}}></input>
            
                    <input placeholder='enter your username' id="username" name='username' value={formData.username} style={{ margin: '1rem', width: '90%', height: '2rem', backgroundColor: 'azure', border: '2px solid white', color:'black' }} onChange={handleInputChange}></input>
              
                    <input placeholder='enter your password' id="password" name='password' value={formData.password} style={{ margin: '1rem', width: '90%', height: '2rem', backgroundColor: 'azure', border: '2px solid white', color:'black' }} onChange={handleInputChange}></input>
           

                <Button text='Submit' submit={handleSubmit}/>
                <Link to='/login' style={{ margin: "1rem" }}>Already a User?</Link>
            </form>

        </>
    )
}
