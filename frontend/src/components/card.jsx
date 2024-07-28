import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, authorName,isbn,image ,publisher}) => {
  const navigate = useNavigate();
  return (
    <div className="card" style={{width:"15rem", height:"20rem", border:"2px solid black",margin:"1rem",borderRadius:"1rem"}}   onClick={() => { navigate(`/card/${isbn}`);}}>
      <img style = {{width:"15rem",height:"10rem",borderTopLeftRadius:"1rem",borderTopRightRadius:"1rem"}} src={image} alt={`${title} cover`}/>
      <h3>{title}</h3>
      <p style={{fontWeight:'300',fontSize:'0.75rem'}}>Author:&nbsp;{authorName}</p>
      <p style={{fontWeight:'300',fontSize:'0.75rem'}}>Publisher:&nbsp;{publisher}</p>
     
     
      
    </div>
  );
};

export default Card;

