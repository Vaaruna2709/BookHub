import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/loginUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('userEmail', formData.email);
        navigate('/user');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
        <h4>Login Form</h4>
        <input
          placeholder='Enter your email'
          value={formData.email}
          id='email'
          name="email"
          onChange={handleInputChange}
          style={{ margin: '1rem', width: '90%', height: '2rem', backgroundColor: 'azure', border: '2px solid white', color: 'black' }}
        />
        <input
          placeholder='Enter your password'
          id="password"
          name='password'
          value={formData.password}
          onChange={handleInputChange}
          style={{ margin: '1rem', width: '90%', height: '2rem', backgroundColor: 'azure', border: '2px solid white', color: 'black' }}
          type="password"
        />
       <Button text='Submit' submit={handleSubmit}/>
        <Link to='/createUser' style={{ margin: "1rem", color: 'white' }}>New User?</Link>
      </form>
    </>
  );
}


