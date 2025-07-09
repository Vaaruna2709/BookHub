import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button'; // Should be styled as green

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

        <label htmlFor="email" style={styles.label}>Username</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your username"
          value={formData.email}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <label htmlFor="password" style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <div style={styles.actions}>
          <Button text="Login" submit={handleSubmit}/>
          <Link to="/createUser" style={styles.link}>Don't have an account?</Link>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    minHeight: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    width: '90%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    textAlign: 'center',
    color: 'green',
    marginBottom: '1.5rem'
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#000'
  },
  input: {
    padding: '0.5rem',
    marginBottom: '1.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  link: {
    fontSize: '0.9rem',
    color: '#007bff',
    textDecoration: 'none'
  }
};
