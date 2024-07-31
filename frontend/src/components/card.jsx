import React from 'react';


const Card = ({ title, authorName,isbn,image ,publisher}) => {
  
  return (
    <div className="card" style={{width:"15rem", height:"20rem"}}   >
      <img style = {{width:"15rem",height:"10rem",borderTopLeftRadius:"1rem",borderTopRightRadius:"1rem"}} src={image} alt={`${title} cover`}/>
      <h3>{title}</h3>
      <p style={{fontWeight:'300',fontSize:'0.75rem'}}>Author:&nbsp;{authorName}</p>
      <p style={{fontWeight:'300',fontSize:'0.75rem'}}>Publisher:&nbsp;{publisher}</p>
     
     
      
    </div>
  );
};

export default Card;

