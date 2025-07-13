import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './SignUp.css';

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
      <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
    
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleInputChange}
          className="signup-input"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          className="signup-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          className="signup-input"
          required
        />
    
        <div className="signup-button-wrapper">
          <Button text="Submit" submit={handleSubmit} />
        </div>
    
        <Link to="/login" className="signup-link">
          Already a user?
        </Link>
      </form>
    </div>
    
    )
}