import React from 'react';
import CardsList from '../components/CardsList';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';

function Home(){
   return (
    <div>
      <Navbar></Navbar>
      <Carousel></Carousel>
      <CardsList></CardsList>
    </div>
   )
}
export default Home;