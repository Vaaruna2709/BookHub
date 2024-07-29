import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/card'; // Ensure correct import path for the Card component

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
            <div className="cards-list" style={{ display: "flex", flexWrap: 'wrap', width: "100%", height: "100vh", padding: "3rem" }}>
                {books.map((book, index) => {
                    const isbn = book.identifiers && book.identifiers.isbn_13 ? book.identifiers.isbn_13[0] : `no-isbn-${book.key}`;

                    return (
                        <Card
                            key={index}
                            isbn={isbn}
                            title={book.title}
                            authorName={book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                            image={book.coverImageUrl}
                            publisher={book.publisher ? book.publisher[0] : 'Unknown'}
                        />
                    );
                })}
            </div>
        </div>
    );
}

