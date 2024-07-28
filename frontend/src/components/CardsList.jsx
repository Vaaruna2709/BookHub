import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './card';



const CardsList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://openlibrary.org/search.json', {
          params: {
            q: 'horror',
            limit: 30,
          }
        
        });
       
        setBooks(response.data.docs);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
  
    

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(books)
  return (
    <div className="books">
      <h4>Available Books</h4>
       <div className="cards-list" style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: 'wrap', width: "100%", height: "100vh",padding:"3rem" }}>
      {books.map((book, index) => {
        const isbn = book.isbn ? book.isbn[0] : `no-isbn-${book.key}`;
        const coverId = book.cover_i;
        const def_img = '../assets/default-img.jpg';
        const coverImageUrl = coverId ? `http://covers.openlibrary.org/b/id/${coverId}.jpg` : def_img;
       
        return (
          <Card
            key={index}
            isbn={isbn}
            title={book.title}
            authorName={book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
            image={coverImageUrl}
            publisher={book.publisher?book.publisher[0]:'Unknown'}
          
           
          />
        );
      })}
    </div>
    </div>
   
  );
};

export default CardsList;

