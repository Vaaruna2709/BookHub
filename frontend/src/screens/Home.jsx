import React from 'react';
import CardsList from '../components/CardsList';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';

export default function Home(){
   return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <div><Navbar></Navbar></div>
      <div><Carousel></Carousel></div>
      {/* <div><CardsList></CardsList></div> */}
    </div>
   )
}
