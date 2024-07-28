import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CardDetail.css'

const CardDetail = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mrp, setMrp] = useState(null);
  const [price, setPrice] = useState(null);


  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get('https://openlibrary.org/api/books', {
          params: {
            bibkeys: `ISBN:${isbn}`,
            format: 'json',
            jscmd: 'data'
          }
        });
        const bookData = response.data[`ISBN:${isbn}`];
        setBook(bookData);
        console.log(bookData);



        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchBookDetails();

    const generatePrice = () => {
      return Math.floor(Math.random() * 2000);
    };

    const mrpGenerator = () => {
      let mrp = generatePrice();
      return mrp > 1000 ? mrp : mrpGenerator();
    };

    const priceGenerator = () => {
      let price = generatePrice();
      return price < 1000 ? price : priceGenerator();
    };

    fetchBookDetails();

    setMrp(mrpGenerator());
    setPrice(priceGenerator());
  }, [isbn]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // const coverId = book.cover_i;
  const def_img = '/default-img.jpg'
  const coverImageUrl = book.cover ? book.cover.medium : def_img;
  
 
 

  return (
   <div style={{width:'100vw',display:'flex',justifyContent:'center',alignItems:'center',height:'fit-content'}}>
    <div className='detail'>
        <div className="image"> <img src={coverImageUrl} alt={`${book.title} cover`} /></div>
        <div className="content">
          <h2>{book.title}</h2>
          <span>MRP:</span>&nbsp; &nbsp;
          <span style={{textDecoration:'line-through'}}>&#8377; {mrp}</span>
          &nbsp; &nbsp; &nbsp;
          <span>&#8377;{price}</span>
          <p>Authors:  {book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown'}</p>
          <p>Publish Date: {book.publish_date}</p>
          <p>Publisher: {book.publishers ? book.publishers.map(publisher =>publisher.name).join(','):'Unknown'}</p>
   
        </div>

      </div>
   </div>
      
   

  );
}
export default CardDetail;