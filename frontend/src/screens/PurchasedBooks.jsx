import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/card'; 
import { Link } from 'react-router-dom';
export default function PurchasedBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/book/purchased', {
                    params: {
                        email: userEmail
                    }
                });

                if (Array.isArray(response.data)) {
                    const extractedBooks = await Promise.all(response.data.map(async item => {
                        const book = item.book;
                        const searchResponse = await axios.get(`https://openlibrary.org/search.json`, {
                            params: {
                                title: book.title
                            }
                        });
                        console.log(searchResponse.data.docs[0]);
                        const coverId = searchResponse.data.docs[0]?.cover_i;
                        const coverImageUrl = coverId
                            ? `http://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                            : '../assets/default-img.jpg';

                        return {
                            ...book,
                            coverImageUrl
                        };
                    }));
                    setBooks(extractedBooks);
                } else {
                    throw new Error('Invalid response format');
                }

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchBooks();
    }, [userEmail]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="books">
            <h4>Purchased Books</h4>
            <div className="cards-list" style={{ display: "flex", flexWrap: 'wrap', width: "100%",  padding: "3rem" }}>
                {books.map((book, index) => {
                    const isbn = book.identifiers && book.identifiers.isbn_13 ? book.identifiers.isbn_13[0] : `no-isbn-${book.key}`;

                    return (
                        <div  key={index} className="card" style={{border:'2px solid black',borderRadius:'1rem',margin:'1rem',display:'flex',flexDirection:'column'}}>
                         <Card
                           
                            isbn={isbn}
                            title={book.title}
                            authorName={book.authors ? book.authors[0].name : 'Unknown Author'}
                            image={book.coverImageUrl}
                            publisher={book.publishers ? book.publishers[0].name : 'Unknown'}
                        />
                        <Link to={book.url}>Read</Link>
                        </div>
                       
                    );
                })}
            </div>
        </div>
    );
}

