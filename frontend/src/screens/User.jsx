import React from 'react'
import Navbar2 from '../components/Navbar2'
import CardsList from '../components/CardsList'
import YourBooks from './YourBook'

export default function User() {
  return (
    <div>
     <Navbar2></Navbar2>
     <YourBooks></YourBooks>
     <CardsList></CardsList>
    </div>
  )
}
