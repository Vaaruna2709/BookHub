import React, { useState } from 'react';
import './Carousel.css';

const Carousel = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const imgArr = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];

  const handleLeftClick = () => {
    setImageIndex((prevImageIndex) => (prevImageIndex > 0 ? prevImageIndex - 1 : prevImageIndex));
  };

  const handleRightClick = () => {
    setImageIndex((prevImageIndex) => (prevImageIndex < imgArr.length - 1 ? prevImageIndex + 1 : prevImageIndex));
  };

  return (
    <div className='container'>
      <i className="fa-solid fa-angle-left" onClick={handleLeftClick} id='left'></i>
      <img src={imgArr[imageIndex]} alt="Random Book" />
      <i className="fa-solid fa-angle-right" onClick={handleRightClick} id='right'></i>
    </div>
  );
};

export default Carousel;
