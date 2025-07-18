import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import './CardDetail.css';
import BookComponent from './BookComponent';
import GPayButton from './GpayButton';

const CardDetail = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mrp, setMrp] = useState(null);
  const [price, setPrice] = useState(null);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const coverImageUrl = queryParams.get('coverImageUrl');

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
        if (!bookData) {
          setError({ message: 'Book not found for this ISBN' });
          setLoading(false);
          return;
        }
        setBook(bookData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchBookDetails();

    const generatePrice = () => Math.floor(Math.random() * 2000);

    const mrpGenerator = () => {
      let mrp = generatePrice();
      return mrp > 1000 ? mrp : mrpGenerator();
    };

    const priceGenerator = () => {
      let price = generatePrice();
      return price < 1000 && price > 300 ? price : priceGenerator();
    };

    setMrp(mrpGenerator());
    setPrice(priceGenerator());
  }, [isbn]);

  const handlePaymentSuccess = async (paymentData) => {
    try {
      const email = localStorage.getItem('userEmail');
      const response = await fetch('http://localhost:8080/book/purchased', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, mrp, book, paymentData })
      });
      const json = await response.json();
      if (json.success) {
        alert('Payment Successful');
      } else {
        alert(json.error || 'Payment Failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  const handlePaymentFailure = (error) => {
    alert('Payment failed. Please try again.');
    console.error(error);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="detail-container">
      <div className="detail">
        <div className="image">
          <img src={coverImageUrl} alt={`${book.title} cover`} />
        </div>
        <div className="content">
          <h2>{book.title}</h2>
        
          <div className="price">
            <span className="mrp">&#8377; {mrp}</span>
            <span className="current-price">&#8377;{price}</span>
          </div>
          <p>Authors: {book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown'}</p>
          <p>Publish Year: {book.publish_date}</p>
          <p>Publisher: {book.publishers ? book.publishers.map(publisher => publisher.name).join(', ') : 'Unknown'}</p>
          <GPayButton
            price={price}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentFailure={handlePaymentFailure}
          />
          <BookComponent isbn={isbn} />
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
