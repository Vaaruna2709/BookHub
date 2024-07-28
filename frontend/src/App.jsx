import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './screens/Home'
import ShowBook from './screens/ShowBook'
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import CreateBook from './screens/CreateBook';
import User from './screens/User';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/card/:isbn" element={<ShowBook />} />
          <Route exact path="/createUser" element={<SignUp />} />
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/user" element={<User/>}/>
          <Route exact path="/createBook" element={<CreateBook/>}/>
        
        </Routes>
      </div>
    </Router>

  )

}

export default App
