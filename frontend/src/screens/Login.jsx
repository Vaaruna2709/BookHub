import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      const response = await fetch('http://localhost:8080/api/loginUser', {
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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <div style={styles.buttonWrapper}>
          <Button text="Submit" submit={handleSubmit}/>
        </div>

        <Link to="/createUser" style={styles.link}>
          Don’t have an account?
        </Link>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '90vh',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    marginBottom: '1.5rem',
    color: 'green'
  },
  input: {
    width: '100%',
    maxWidth: '400px',
    height: '2.5rem',
    marginBottom: '1rem',
    padding: '0.5rem',
    fontSize: '1rem',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  buttonWrapper: {
    marginTop: '0.5rem',
    marginBottom: '1rem'
  },
  link: {
    color: '#0d6efd',
    fontSize: '0.9rem',
    textDecoration: 'none'
  }
};
