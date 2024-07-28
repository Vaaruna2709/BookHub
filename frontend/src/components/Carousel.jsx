import React, { useState, useEffect } from 'react';
import './Carousel.css';
const Carousel = () => {
  const [image, setImage] = useState(0);
  let imgArr =[ '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg'
  ];
 
 let clickEvent = (event)=>{
     let fieldName= event.target.className;
     if(fieldName =='fa-solid fa-angle-left'){
        if(image>0){
           let newImage = image-1;
            setImage(newImage)
        }else{
            setImage(image);
        }
     }else{
        if(image<2){
           let newImage = image +1;
           setImage(newImage)
        }else{
            setImage(image);
        }
     }
  }


  return (
    <div className='container'>
      <i className="fa-solid fa-angle-left" onClick={clickEvent} name="left" id='left'></i>
      <img src={imgArr[image]} alt="Random Book" />
      <i className="fa-solid fa-angle-right" onClick={clickEvent}name='right' id='right'></i>
    </div>
  );
};

export default Carousel;
