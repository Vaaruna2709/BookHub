import React, { useState, useEffect } from 'react';
import './BookComponent.css'
const BookComponent = ({ isbn }) => {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    setSavedBooks(savedBooks);
  }, []);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    setSavedBooks(savedBooks);
  }, [isbn]);

  const handleSave = () => {
    let newSavedBooks;
    if (savedBooks.includes(isbn)) {
      newSavedBooks = savedBooks.filter(bookId => bookId !== isbn);
    } else {
      newSavedBooks = [...savedBooks, isbn];
    }

    setSavedBooks(newSavedBooks);
    localStorage.setItem('savedBooks', JSON.stringify(newSavedBooks));
  };

  const isSaved = savedBooks.includes(isbn);

  return (
    <div>
      <div
        id="heart"
        onClick={handleSave}
        className={isSaved ? 'saved' : ''}
        data-id={isbn}
      >
        &#9829;
      </div>
    </div>
  );
};

export default BookComponent;