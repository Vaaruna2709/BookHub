import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './card';
import { useNavigate } from 'react-router-dom';

const CardsList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const query = 'classic';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const searchRes = await axios.get('https://openlibrary.org/search.json', {
          params: {
            q: query,
            limit: 10,
          },
        });

        const workKeys = searchRes.data.docs
          .map((doc) => doc.key)
          .filter((key) => key.startsWith('/works/'));

        const allBooks = [];

       
        for (const workKey of workKeys) {
          const workId = workKey.split('/').pop(); // e.g., OL12345W
          const editionsRes = await axios.get(`https://openlibrary.org/works/${workId}/editions.json?limit=1`);
          const edition = editionsRes.data.entries[0];

          if (edition) {
            allBooks.push({
              title: edition.title,
              isbn: edition.isbn_13?.[0] || edition.isbn_10?.[0] || edition.key.replace('/books/', ''),
              publisher: edition.publishers?.[0] || 'Unknown',
              coverId: edition.covers?.[0] || null,
              key: edition.key,
            });
          }
        }

        setBooks(allBooks);
        console.log(allBooks);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="books">
      <h4>Available Books</h4>
      <div
        className="cards-list"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100%',
          height: '100%',
          padding: '3rem',
         
        }}
      >
        {books.map((book, index) => {
          const coverImageUrl = book.coverId
            ? `http://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
            : '/default-img.jpg';

          return (
            <div
              key={book.isbn}
              className="card"
              style={{ border: '2px solid black', margin: '1rem', borderRadius: '1rem' }}
              onClick={() =>
                navigate(`/card/${book.isbn}?coverImageUrl=${encodeURIComponent(coverImageUrl)}`)
              }
            >
              <Card
                isbn={book.isbn}
                title={book.title}
                authorName="Unknown" // editions API doesn’t return authors reliably
                image={coverImageUrl}
                publisher={book.publisher}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardsList;
